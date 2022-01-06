// React & Navigation
import React, { useState } from "react";
import {
  AlertIOS,
  Button,
  Modal,
  Platform,
  ToastAndroid,
  View,
} from "react-native";
// Components
import ModalStarted from "../components/modal-views/ModalStarted.js";
import ModalGotBook from "../components/modal-views/ModalGotBook";
import ModalGotSubjects from "../components/modal-views/ModalGotSubjects";
import ModalGotAuthorWorks from "../components/modal-views/ModalGotAuthorWorks";
import ModalGotRecommendedBooks from "../components/modal-views/ModalGotRecommendedBooks";
import ModalError from "../components/modal-views/ModalError";
import InputISBN from "../components/InputISBN.js";
// Styles
import { container } from "../styles.js";
// API Calls
import {
  GetAuthorByKey,
  GetAuthorWorksByKey,
  GetBookByISBN,
  GetBooksBySubject,
  GetSubjectsByKey,
} from "../scripts/bookApiCalls";

/**
 * TODO
 * @returns {Camera}
 */
const Camera = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [recommendations, setRecommendations] = useState({
    state: "NOT_STARTED",
    isbn: "",
    authorWorks: [],
    recommendedWorks: [],
  });
  console.log(recommendations["state"]);
  /**
   * TODO
   */
  const LookupBook = async () => {
    // Book by ISBN
    // Mr Fox 0140306765
    // Histories 9780140449082
    // Zen 9780099786405
    // Tender 9780241341483

    let book;

    console.log(recommendations["isbn"]);

    if (recommendations["isbn"] === "") {
      book = await GetBookByISBN("9780099786405");
    } else {
      book = await GetBookByISBN(recommendations["isbn"]);
    }

    if (book.hasOwnProperty("error")) {
      setRecommendations({ state: "ERROR" });
    } else {
      // Can't set recCopy = recommendations. Needs different reference, otherwise won't re-render.
      let recCopy = JSON.parse(JSON.stringify(recommendations));
      recCopy["book"] = book;
      recCopy["state"] = "GOT_BOOK";
      setRecommendations(recCopy);
    }
  };

  const LookupAuthor = async () => {
    let author = await GetAuthorByKey(recommendations["book"]["authorKey"]);

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["book"]["author"] = author["name"];
    recCopy["state"] = "GOT_AUTHOR";

    setRecommendations(recCopy);
  };

  /**
   * TODO
   */
  const LookupSubjects = async () => {
    let subjects = await GetSubjectsByKey(recommendations["book"]["workKey"]);

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["subjects"] = subjects;
    recCopy["state"] = "GOT_SUBJECTS";

    setRecommendations(recCopy);
  };

  /**
   * TODO
   */
  const LookupAuthorWorks = async () => {
    let works = await GetAuthorWorksByKey(recommendations["book"]["authorKey"]);

    // Add Author name to each work.
    for (let i = 0; i < works.length; i++) {
      works[i]["author"] = recommendations["book"]["author"];
    }

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["state"] = "GOT_AUTHOR_WORKS";
    recCopy["authorWorks"] = works;

    setRecommendations(recCopy);
  };

  /**
   * TODO
   * @param {*} subjects
   */
  const LookupRecommendedBooks = async (subjects) => {
    let books = await GetBooksBySubject(subjects);

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["state"] = "GOT_RECOMMENDED_BOOKS";
    recCopy["recommendedWorks"] = books;

    setRecommendations(recCopy);
  };

  // Return Not Started Modal
  if (recommendations["state"] === "NOT_STARTED") {
    return (
      <View style={container.container}>
        <InputISBN
          recommendations={recommendations}
          setRecommendations={setRecommendations}
        />

        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => {
            let recCopy = JSON.parse(JSON.stringify(recommendations));
            recCopy["state"] = "STARTED";
            setRecommendations(recCopy);
          }}
        ></Button>
      </View>
    );
  }
  // Return Started Modal
  else if (recommendations["state"] === "STARTED") {
    return (
      <View style={container.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onShow={LookupBook}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalStarted />
        </Modal>

        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  }

  // Return Got Book Modal
  else if (recommendations["state"] === "GOT_BOOK") {
    LookupAuthor();

    return (
      <View style={container.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotBook book={recommendations["book"]} />
        </Modal>
        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  } else if (recommendations["state"] === "GOT_AUTHOR") {
    LookupSubjects();
    return (
      <View style={container.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotSubjects book={recommendations["book"]} />
        </Modal>
        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  }

  // Return Got Subjects Modal
  else if (recommendations["state"] === "GOT_SUBJECTS") {
    LookupAuthorWorks();

    return (
      <View style={container.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotSubjects book={recommendations["book"]} />
        </Modal>
        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  }

  // Return Got Author Works Modal
  else if (recommendations["state"] === "GOT_AUTHOR_WORKS") {
    LookupRecommendedBooks(subjectData);

    return (
      <View style={container.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotAuthorWorks book={recommendations["book"]} />
        </Modal>
        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  }

  // Return Got Recommended Books Modal
  else if (recommendations["state"] === "GOT_RECOMMENDED_BOOKS") {
    let lookupBook = recommendations["book"];
    lookupBook["description"] = recommendations["subjects"]["description"];

    // TODO: Remove duplicate recommendations.
    let recBooks = recommendations["authorWorks"].concat(
      recommendations["recommendedWorks"]
    );

    return (
      <View style={container.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotRecommendedBooks
            recBooks={recBooks}
            lookupBook={lookupBook}
            updateState={setRecommendations}
          />
        </Modal>
        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  }

  // Complete Modal
  else if (recommendations["state"] === "LOOKUP_COMPLETE") {
    if (Platform.OS === "android") {
      ToastAndroid.show("Saved Wishlist!", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("Saved Wishlist!");
    }

    // Default States
    setModalVisible(!modalVisible);
    setRecommendations({
      state: "NOT_STARTED",
      authorWorks: [],
      recommendedWorks: [],
    });
  }

  // Return Error Modal
  else if (recommendations["state"] === "ERROR") {
    return (
      <View style={container.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalError />
        </Modal>
        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  }
};

export default Camera;

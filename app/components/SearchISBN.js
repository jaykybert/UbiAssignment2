// React
import React, { useState } from "react";
import { AlertIOS, Modal, Platform, ToastAndroid, View } from "react-native";
// Components
import ModalStarted from "./modal-views/ModalStarted.js";
import ModalGotBook from "./modal-views/ModalGotBook";
import ModalGotSubjects from "./modal-views/ModalGotSubjects";
import ModalGotAuthorWorks from "./modal-views/ModalGotAuthorWorks";
import ModalGotRecommendedBooks from "./modal-views/ModalGotRecommendedBooks";
import ModalError from "./modal-views/ModalError";
import InputISBN from "./InputISBN.js";
import ScanISBN from "./ScanISBN";
// Styles
import { controller, container } from "../styles.js";
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
 * @returns {SearchISBN}
 */
const SearchISBN = ({ isbn }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [recommendations, setRecommendations] = useState({
    state: "NOT_STARTED",
    isbn: isbn,
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
    let book = await GetBookByISBN(recommendations["isbn"]);

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
        <ScanISBN
          recommendations={recommendations}
          setRecommendations={setRecommendations}
        />
      </View>
    );
  }
  // Return Started Modal
  else if (recommendations["state"] === "STARTED") {
    LookupBook();
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalStarted isbn={recommendations["isbn"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Book Modal
  else if (recommendations["state"] === "GOT_BOOK") {
    LookupAuthor();

    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotBook book={recommendations["book"]} />
        </Modal>
      </View>
    );
  } else if (recommendations["state"] === "GOT_AUTHOR") {
    LookupSubjects();
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotSubjects book={recommendations["book"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Subjects Modal
  else if (recommendations["state"] === "GOT_SUBJECTS") {
    LookupAuthorWorks();

    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotSubjects book={recommendations["book"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Author Works Modal
  else if (recommendations["state"] === "GOT_AUTHOR_WORKS") {
    LookupRecommendedBooks(subjectData);

    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotAuthorWorks book={recommendations["book"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Recommended Books Modal
  else if (recommendations["state"] === "GOT_RECOMMENDED_BOOKS") {
    let lookupBook = recommendations["book"];
    lookupBook["description"] = recommendations["subjects"]["description"];

    let recBooks = recommendations["authorWorks"].concat(
      recommendations["recommendedWorks"]
    );

    // Code to remove duplicates found here:
    // https://stackoverflow.com/questions/32634736/javascript-object-array-removing-objects-with-duplicate-properties
    recBooks = recBooks.reduce(function (prev, current) {
      if (
        !prev.some(function (element) {
          return element.key === current.key;
        })
      )
        prev.push(current);
      return prev;
    }, []);

    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotRecommendedBooks
            recBooks={recBooks}
            lookupBook={lookupBook}
            updateState={setRecommendations}
          />
        </Modal>
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
    //setModalVisible(true);
    setRecommendations({
      state: "NOT_STARTED",
      isbn: "",
      authorWorks: [],
      recommendedWorks: [],
    });
  }

  // Return Error Modal
  else if (recommendations["state"] === "ERROR") {
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalError />
        </Modal>
      </View>
    );
  }
};

export default SearchISBN;

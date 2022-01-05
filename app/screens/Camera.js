// React & Navigation
import React, { useState } from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
// Components
import ModalNotStarted from "../components/modal-views/ModalNotStarted.js";
import ModalGotBook from "../components/modal-views/ModalGotBook";
import ModalGotSubjects from "../components/modal-views/ModalGotSubjects";
import ModalGotAuthorWorks from "../components/modal-views/ModalGotAuthorWorks";
import ModalGotRecommendedBooks from "../components/modal-views/ModalGotRecommendedBooks";
import ModalError from "../components/modal-views/ModalError";
// Styles
import { container } from "../styles.js";
// Utilities
import {
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
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendations, setRecommendations] = useState({
    state: "NOT_STARTED",
    authorWorks: [],
    recommendedWorks: [],
  });

  /**
   * TODO
   */
  const LookupBook = async () => {
    // Book by ISBN
    // Mr Fox 0140306765
    // Histories 9780140449082
    // Zen 9780099786405

    let book = await GetBookByISBN("9780099786405");

    if (book.hasOwnProperty("error")) {
      setRecommendations({ state: "ERROR" });
    } else {
      // Can't set recCopy = recommendations. Won't re-render.
      let recCopy = JSON.parse(JSON.stringify(recommendations));
      recCopy["book"] = book;
      recCopy["state"] = "GOT_BOOK";
      setRecommendations(recCopy);
    }
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
  const LookupAuthorsWorks = async () => {
    let works = await GetAuthorWorksByKey(recommendations["book"]["authorKey"]);

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
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onShow={LookupBook}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalNotStarted />
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
    LookupSubjects();

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
  }

  // Return Got Subjects Modal
  else if (recommendations["state"] === "GOT_SUBJECTS") {
    LookupAuthorsWorks();

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
    let allRecommendations = recommendations["authorWorks"].concat(
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
          <ModalGotRecommendedBooks recBooks={allRecommendations} />
        </Modal>
        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
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

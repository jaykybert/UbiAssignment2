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
  const [recommendationState, setRecommendationState] = useState("NOT_STARTED");
  const [recommendationData, setRecommendationData] = useState();

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
      setRecommendationState("ERROR");
    } else {
      setRecommendationData({ book: bookData });
      setRecommendationState("GOT_BOOK");
    }
  };

  /**
   * TODO
   */
  const LookupSubjects = async () => {
    let subjects = await GetSubjectsByKey(
      recommendationData["book"]["workKey"]
    );
    setRecommendationState("GOT_SUBJECTS");
    let recDataCopy = recommendationData;
    recDataCopy["subjects"] = subjects;
    setRecommendationData(recDataCopy);
  };

  /**
   * TODO
   */
  const LookupAuthorsWorks = async () => {
    let works = await GetAuthorWorksByKey(
      recommendationData["book"]["authorKey"]
    );
    setRecommendationState("GOT_AUTHOR_WORKS");
    let recDataCopy = recommendationData;
    recDataCopy["recommendations"] = works;
    setRecommendationData(recDataCopy);
  };

  /**
   * TODO
   * @param {*} subjects
   */
  const LookupRecommendedBooks = async (subjects) => {
    let books = await GetBooksBySubject(subjects);
    setRecommendationState("GOT_RECOMMENDED_BOOKS");
    let recDataCopy = recommendationData;
    for (let i = 0; i < books.length; i++) {
      recDataCopy["recommendations"].push(books[i]);
    }
    setRecommendationData(recDataCopy);
  };

  // Return Not Started Modal
  if (recommendationState === "NOT_STARTED") {
    return (
      <View style={styles.container}>
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
  else if (recommendationState === "GOT_BOOK") {
    if (!recommendationData.hasOwnProperty("subjects")) {
      LookupSubjects();
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotBook bookData={recommendationData["book"]} />
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
  else if (recommendationState === "GOT_SUBJECTS") {
    if (!recommendationData.hasOwnProperty("recommendations")) {
      LookupAuthorsWorks();
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotSubjects bookData={recommendationData["book"]} />
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
  else if (recommendationState === "GOT_AUTHOR_WORKS") {
    if (!recommendationData.hasOwnProperty("recommendations")) {
      LookupRecommendedBooks(subjectData);
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotAuthorWorks bookData={recommendationData["book"]} />
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
  else if (recommendationState === "GOT_RECOMMENDED_BOOKS") {
    return (
      <View style={styles.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalGotRecommendedBooks
            recBooks={recommendationData["recommendations"]}
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

  // Return Error Modal
  else if (recommendationState === "ERROR") {
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    height: 550,
  },
});

export default Camera;

// React & Navigation
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
// Components
import NotStartedModalContents from "../components/NotStartedModalContents";
import GotBookModalContents from "../components/GotBookModalContents";
import GotSubjectsModalContents from "../components/GotSubjectsModalContents";
import GotAuthorsWorksModalContents from "../components/GotAuthorsWorksModalContents";
import ErrorModalContents from "../components/ErrorModalContents";
import RecommendationModal from "../components/RecommendationModal";
// Utilities
import {
  GetAuthorsWorksByKey,
  GetBookByISBN,
  GetBooksBySubject,
  GetSubjectsByWorkKey,
} from "../scripts/bookApiCalls";

/**
 * TODO
 * @returns {Camera}
 */
const Camera = () => {
  const [bookData, setBookData] = useState();
  const [authorWorks, setAuthorWorks] = useState();
  const [relatedBooks, setRelatedBooks] = useState();
  const [subjectData, setSubjectData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendationProgress, setRecommendationProgress] =
    useState("NOT_STARTED");

  const LookupBook = async () => {
    // Book by ISBN

    // Mr Fox 0140306765
    // Histories 9780140449082
    // Zen 9780099786405

    let bookData = await GetBookByISBN("0140306765");
    console.log(bookData);

    if (bookData.hasOwnProperty("error")) {
      setRecommendationProgress("ERROR");
    } else {
      setBookData(bookData);
      setRecommendationProgress("GOT_BOOK");
    }
  };

  const LookupSubjects = async () => {
    // Book Subjects by Key
    let subjects = await GetSubjectsByWorkKey(bookData["workKey"]);
    setSubjectData(subjects);
    setRecommendationProgress("GOT_SUBJECTS");
  };

  const LookupAuthorsWorks = async () => {
    // (Primary) Author's Works by Key
    let authorsWorks = await GetAuthorsWorksByKey(bookData["authorKey"]);
    setAuthorWorks(authorsWorks);
    setRecommendationProgress("GOT_AUTHORS_WORKS");
  };

  const LookupRelatedBooks = async (subjects) => {
    // Related Books by Subject
    let relatedBooks = await GetBooksBySubject(subjects);
    setRelatedBooks(relatedBooks);
    setRecommendationProgress("GOT_RELATED_BOOKS");
  };

  if (recommendationProgress === "NOT_STARTED") {
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
          <NotStartedModalContents />
        </Modal>

        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  } else if (recommendationProgress === "GOT_BOOK") {
    LookupSubjects();
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
          <GotBookModalContents bookData={bookData} />
        </Modal>

        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  } else if (recommendationProgress === "GOT_SUBJECTS") {
    LookupAuthorsWorks();
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
          <GotSubjectsModalContents bookData={bookData} />
        </Modal>

        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  } else if (recommendationProgress === "GOT_AUTHORS_WORKS") {
    LookupRelatedBooks(subjectData);
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
          <GotAuthorsWorksModalContents bookData={bookData} />
        </Modal>

        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  } else if (recommendationProgress === "GOT_RELATED_BOOKS") {
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
          <RecommendationModal />
        </Modal>

        <Button
          title="Lookup"
          accessibilityLabel="Lookup information."
          onPress={() => setModalVisible(true)}
        ></Button>
      </View>
    );
  } else if (recommendationProgress === "ERROR") {
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
          <ErrorModalContents />
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
    alignItems: "center",
  },
});

export default Camera;

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
  const [subjectData, setSubjectData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendationProgress, setRecommendationProgress] =
    useState("NOT_STARTED");

  const LookupBook = async () => {
    // Book by ISBN
    let bookData = await GetBookByISBN("0140306765");
    setBookData(bookData);
    setRecommendationProgress("GOT_BOOK");
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
    setRecommendationProgress("GOT_AUTHORS_WORKS");
  };

  const LookupRelatedBooks = async (subjects) => {
    // Related Books by Subject
    let relatedBooks = await GetBooksBySubject(subjects);
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
      <View>
        <Text>Related Books</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Error</Text>
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

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
// Utilities
import {
  GetBookByISBN,
  GetAuthorsWorksByKey,
  GetBooksBySubject,
} from "../scripts/bookApiCalls";

/**
 * TODO
 * @returns
 */
const Camera = () => {
  const [bookData, setBookData] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const [bookLookedUp, setBookLookedUp] = useState(false);
  const [worksLookedUp, setWorksLookedUp] = useState(false);

  /**
   * TODO
   */
  const BookRecommendations = async () => {
    let bookData = await GetBookByISBN("0140306765");
    setBookLookedUp(true);
    setBookData(bookData);

    // TODO: Make following calls non-blocking.
    const authorKey = bookData["authors"][0]["key"];
    let authorsWorks = await GetAuthorsWorksByKey(authorKey);
    setWorksLookedUp(true);

    let relatedBooks = await GetBooksBySubject(bookData["works"][0]["key"]);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={BookRecommendations}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <ActivityIndicator
              color="black"
              size="large"
              animating={!bookLookedUp}
            />
            <Text>{bookData["title"]}</Text>

            <ActivityIndicator
              color="red"
              size="large"
              animating={bookLookedUp && !worksLookedUp}
            />

            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={modalStyles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Button
        title="Lookup"
        accessibilityLabel="Lookup information."
        onPress={() => setModalVisible(true)}
      ></Button>

      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 100,
  },
  modalView: {
    margin: 15,
    backgroundColor: "#f6f6f6",
    borderRadius: 25,
    paddingTop: 30,
    paddingBottom: 5,
    alignItems: "center",
    elevation: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#e12222",
    padding: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
  },
});

export default Camera;

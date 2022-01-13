/**
 * @file ModalLookupBook.js
 *
 * Contains the ModalLookupBook component.
 */

// React
import React from "react";
import {
  Button,
  Modal,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Styles
import {
  colors,
  lookupBookModal,
  modal,
  wishlistAuthorBooks,
} from "../../styles";

/**
 * @function ModalLookupBook
 * @param {object} book - lookup book information.
 * @param {JSX} coverImage - book cover.
 * @param {modalVisible} - state variable from LookupBook component.
 * @param {function} setModalVisible - update state function from LookupBook component.
 * @param {function} onDeleteLookup - function from LookupHistoryScreen component.
 *
 * Display the lookup book contents inside of a modal.
 */
const ModalLookupBook = ({
  book,
  coverImage,
  modalVisible,
  setModalVisible,
  onDeleteLookup,
}) => {
  let desc =
    book["description"] !== null
      ? book["description"]
      : "No description provided.";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={modal.centeredView}>
        <View style={modal.modalView}>
          <View style={wishlistAuthorBooks.headingView}>
            <Text style={wishlistAuthorBooks.author}>
              Searched: {book["date"]}
            </Text>
            <Text style={wishlistAuthorBooks.title}>{book["title"]}</Text>
            <Text style={wishlistAuthorBooks.author}>{book["author"]}</Text>
          </View>

          <View style={wishlistAuthorBooks.coverView}>{coverImage}</View>

          <View style={lookupBookModal.scroll}>
            <ScrollView>
              <Text>{desc}</Text>
            </ScrollView>
          </View>

          <View>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#fff"
              onPress={() => {
                setModalVisible(!modalVisible);
                onDeleteLookup(book["id"]);
              }}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={75}
                color={colors.black}
              />
            </TouchableHighlight>
            <Text style={wishlistAuthorBooks.favouriteText}>Delete</Text>
          </View>

          <View style={wishlistAuthorBooks.buttonView}>
            <Button
              title="Close"
              style={wishlistAuthorBooks.button}
              color={colors.darkGreen}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLookupBook;

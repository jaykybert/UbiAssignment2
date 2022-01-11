/**
 * @file ModalWishlistAuthorRec.js
 *
 * Contains the ModalWishlistAuthorRec component.
 */

// React
import React from "react";
import { Button, Modal, Text, TouchableHighlight, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Styles
import { modal, wishlistAuthorBooks, colors } from "../../styles";

/**
 * @function ModalWishlistAuthorRec
 * @param {object} book - information on the book to be displayed.
 * @param {JSX} coverImage - the cover of the book.
 * @param {boolean} modalVisible - state variable from WishlistBook component.
 * @param {function} setModalVisible - update state function from WishlistBook component.
 * @param {function} onUnfavouriteBook - function called when book is unfavourited, from WishlistBooks component.
 *
 * Display the wishlisted book (from recsByAuthor) inside of a modal.
 */
const ModalWishlistAuthorRec = ({
  book,
  coverImage,
  modalVisible,
  setModalVisible,
  onUnfavouriteBook,
}) => {
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
            <Text style={wishlistAuthorBooks.title}>{book["title"]}</Text>
            <Text style={wishlistAuthorBooks.author}>
              {book["author"]}
              {book["published"] !== "" ? `, ${book["published"]}` : ""}
            </Text>
          </View>

          <View style={wishlistAuthorBooks.coverView}>{coverImage}</View>

          <View style={wishlistAuthorBooks.descriptionView}>
            <Text>{book["description"]}</Text>
          </View>

          <View>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#fff"
              onPress={() => {
                setModalVisible(!modalVisible);
                onUnfavouriteBook(book["id"]);
              }}
            >
              <MaterialCommunityIcons
                name="star"
                size={75}
                color={colors.gold}
              />
            </TouchableHighlight>
            <Text style={wishlistAuthorBooks.favouriteText}>Remove</Text>
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

export default ModalWishlistAuthorRec;

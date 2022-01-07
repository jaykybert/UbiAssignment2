/**
 * @file ModalWishlistSubjectRec.js
 *
 * TODO
 */

// React
import React from "react";
import { Button, Modal, Text, TouchableHighlight, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Styles
import { modal, wishlistAuthorBooks, colors } from "../../styles";

const ModalWishlistSubjectRec = ({
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
      onShow={() => {
        console.log("Showing");
      }}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={modal.centeredView}>
        <View style={modal.modalView}>
          <View style={wishlistAuthorBooks.headingView}>
            <Text style={wishlistAuthorBooks.title}>{book["title"]}</Text>
            <Text style={wishlistAuthorBooks.author}>{book["author"]}</Text>
          </View>

          <View style={wishlistAuthorBooks.coverView}>{coverImage}</View>

          <View style={wishlistAuthorBooks.descriptionView}>
            <Text>{book["subjects"]}</Text>
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

export default ModalWishlistSubjectRec;

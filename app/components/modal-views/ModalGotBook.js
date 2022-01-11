/**
 * @file ModalGotBook.js
 *
 * Contains the ModalGotBook component.
 */

// React
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
// Styles
import { authorWorks, colors, modal } from "../../styles";

/**
 * @function ModalGotBook
 * @param {object} book - information on the lookup book.
 *
 * The modal contents displayed when state is GOT_BOOK.
 */
const ModalGotBook = ({ book }) => {
  let cover =
    book["cover"] !== "" ? (
      (cover = (
        <Image source={{ uri: book["cover"], width: 150, height: 220 }} />
      ))
    ) : (
      <Image
        source={require("../../assets/default-book.bmp")}
        style={authorWorks.cover}
      ></Image>
    );

  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image
          source={require("../../assets/complete.png")}
          style={modal.image}
        />
        <Text style={authorWorks.title}>{book["title"]}</Text>
        {cover}
        <Text style={authorWorks.author}>Getting author...</Text>
        <ActivityIndicator size="large" color={colors.darkGreen} />
      </View>
    </View>
  );
};

export default ModalGotBook;

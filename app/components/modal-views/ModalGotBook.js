// React
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
// Styles
import { authorWorks, colors, modal } from "../../styles";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const ModalGotBook = ({ book }) => {
  let cover;
  // No cover url.
  if (book["cover"] === "") {
    cover = (
      <Image
        source={require("../../assets/default-book.bmp")}
        style={authorWorks.cover}
      ></Image>
    );
  }
  // Cover url.
  else {
    cover = <Image source={{ uri: book["cover"], width: 150, height: 220 }} />;
  }

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

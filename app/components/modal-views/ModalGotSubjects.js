// React
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
// Styles
import { authorWorks, modal } from "../../styles";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const ModalGotSubjects = ({ book }) => {
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
        <Text>{book["title"]}</Text>
        <Text>{book["author"]}</Text>
        {cover}

        <Text>Got author.</Text>
        <Image
          source={require("../../assets/complete.png")}
          style={modal.image}
        />

        <Text>Got subjects.</Text>
        <Image
          source={require("../../assets/complete.png")}
          style={modal.image}
        />

        <Text>Getting author's works...</Text>
        <ActivityIndicator size="large" color="black" />
      </View>
    </View>
  );
};

export default ModalGotSubjects;

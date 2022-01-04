// React
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
// Styles
import { modal } from "../../styles";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const ModalGotBook = ({ bookData }) => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image
          source={require("../../assets/complete.png")}
          style={modal.image}
        />
        <Text>{bookData["title"]}</Text>
        <Image
          source={{ uri: bookData["coverUrl"], width: 150, height: 220 }}
        />
        <Text>Getting book subjects...</Text>
        <ActivityIndicator size="large" color="black" />
      </View>
    </View>
  );
};

export default ModalGotBook;

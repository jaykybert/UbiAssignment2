// React
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
// Styles
import { modal } from "../styles";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const ErrorModalContents = () => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image source={require("../assets/error.png")} style={modal.image} />
        <Text>Couldn't find the book. Is the ISBN correct?</Text>
      </View>
    </View>
  );
};

export default ErrorModalContents;

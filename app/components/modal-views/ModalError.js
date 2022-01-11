/**
 * @file ModalError.js
 *
 * Contains the ModalError component.
 */

// React
import React from "react";
import { Image, Text, View } from "react-native";
// Styles
import { modal } from "../../styles";

/**
 * @function ModalError
 *
 * The modal contents displayed when state is ERROR.
 */
const ModalError = () => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image source={require("../../assets/error.png")} style={modal.image} />
        <Text>Couldn't find the book. Is the ISBN correct?</Text>
      </View>
    </View>
  );
};

export default ModalError;

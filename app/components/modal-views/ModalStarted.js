/**
 * @file ModalStarted.js
 *
 * Contains the ModalStarted component.
 */

// React
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
// Styles
import { colors, modal } from "../../styles";

/**
 * @function ModalStarted
 * @param {string} isbn - the ISBN to be searched.
 *
 * The modal contents displayed when state is STARTED.
 */
const ModalStarted = ({ isbn }) => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <ActivityIndicator size="large" color={colors.darkGreen} />
        <Text>Looking for {isbn}...</Text>
      </View>
    </View>
  );
};

export default ModalStarted;

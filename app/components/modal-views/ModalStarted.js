// React
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
// Styles
import { colors, modal } from "../../styles";

/**
 * TODO
 * @returns
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

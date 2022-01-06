// React
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
// Styles
import { modal } from "../../styles";

/**
 * TODO
 * @returns
 */
const ModalStarted = () => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <ActivityIndicator size="large" color="black" />
        <Text>Looking for book by ISBN...</Text>
      </View>
    </View>
  );
};

export default ModalStarted;

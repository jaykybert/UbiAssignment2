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
const ModalGotSubjects = ({ book }) => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image
          source={require("../../assets/complete.png")}
          style={modal.image}
        />
        <Text>{book["title"]}</Text>
        <Image source={{ uri: book["coverUrl"], width: 150, height: 220 }} />
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
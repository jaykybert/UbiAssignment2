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
const RecommendationModal = () => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image
          source={require("../assets/complete.png")}
          style={modal.imageLarge}
        />
        <Text>Recommendations found!</Text>
      </View>
    </View>
  );
};

export default RecommendationModal;

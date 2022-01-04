// React
import React from "react";
import { Image, View } from "react-native";
// Components
import RecommendedBooks from "../RecommendedBooks";
// Styles
import { modal } from "../../styles";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const ModalGotRecommendedBooks = ({ recBooks }) => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image
          source={require("../../assets/complete.png")}
          style={modal.image}
        />

        <RecommendedBooks recBooks={recBooks} />
      </View>
    </View>
  );
};

export default ModalGotRecommendedBooks;

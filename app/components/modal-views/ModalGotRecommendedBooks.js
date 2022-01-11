/**
 * @file ModalGotRecommendedBooks.js
 *
 * Contains the ModalGotRecommendedBooks component.
 */

// React
import React from "react";
import { Image, View } from "react-native";
// Components
import RecommendedBooks from "../RecommendedBooks";
// Styles
import { modal } from "../../styles";

/**
 * @function ModalGotRecommendedBooks
 * @param {array} recBooks - array of all recommended books (by author and subject).
 * @param {object} lookupBook - information on the lookup book.
 * @param {function} setRecommendations - update state function inside SearchISBN component.
 *
 * The modal contents displayed when state is GOT_RECOMMENDED_BOOKS.
 */
const ModalGotRecommendedBooks = ({
  recBooks,
  lookupBook,
  setRecommendations,
}) => {
  return (
    <View style={modal.centeredView}>
      <View style={modal.modalView}>
        <Image
          source={require("../../assets/complete.png")}
          style={modal.image}
        />

        <RecommendedBooks
          recBooks={recBooks}
          lookupBook={lookupBook}
          setRecommendations={setRecommendations}
        />
      </View>
    </View>
  );
};

export default ModalGotRecommendedBooks;

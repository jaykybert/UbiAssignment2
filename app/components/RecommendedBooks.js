/**
 * @file RecommendedBooks.js
 *
 * Contains the RecommendedBooks component.
 */

// React
import React, { useState } from "react";
import { Button, FlatList, View } from "react-native";
// Components
import RecommendedBook from "./RecommendedBook";
// Styles
import { colors } from "../styles";
// Database
import * as db from "../database";

/**
 * @function RecommendedBooks
 * @param {array} recBooks - array of objects that contain book information.
 * @param {object} lookupBook - the book that was looked up.
 * @param {function} setRecommendations - update state function from SearchISBN component.
 *
 * Flatlist of the recommended books with functions for inserting the lookup book and setting whether favourited.
 * Inserts the lookup book into the database.
 */
const RecommendedBooks = ({ recBooks, lookupBook, setRecommendations }) => {
  const [books, setBooks] = useState(recBooks);

  /**
   * @function AddToFavourites
   * @param {string} key - the key of the book to favourite.
   * @param {boolean} isFavourite - whether the book should be made favourite or not.
   *
   * Find the book inside books using the key, and update the favourited property.
   */
  const addToFavourites = (key, isFavourite) => {
    for (let i = 0; i < books.length; i++) {
      if (books[i]["key"] === key) {
        // Match, update property
        let booksCopy = JSON.parse(JSON.stringify(books));

        booksCopy[i]["favourited"] = isFavourite;
        setBooks(booksCopy);
      }
    }
  };

  /**
   * @function onInsertedLookup
   * @param {number} lookupId
   *
   * Callback function called when successfully insert lookup book into database.
   */
  const onInsertedLookup = (lookupId) => {
    for (let i = 0; i < books.length; i++) {
      if (books[i]["recommendationReason"] === "author") {
        db.insertRecommendationByAuthor(books[i], lookupId);
      } else if (books[i]["recommendationReason"] === "subject") {
        db.insertRecommendationBySubject(books[i], lookupId);
      }
    }

    setRecommendations({ state: "LOOKUP_COMPLETE" });
  };

  /**
   * @function saveToDatabase
   *
   * Save the lookup book into the database.
   */
  const saveToDatabase = () => {
    db.insertLookup(lookupBook, onInsertedLookup);
  };

  return (
    <View style={{ height: 575, paddingBottom: 15, alignItems: "center" }}>
      <FlatList
        data={recBooks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <RecommendedBook book={item} addToFavourites={addToFavourites} />
        )}
      />

      <View style={{ marginTop: 10, width: 100 }}>
        <Button
          title="Save to Wishlist"
          color={colors.darkGreen}
          onPress={() => {
            console.log("saving...");
            saveToDatabase();
          }}
        />
      </View>
    </View>
  );
};

export default RecommendedBooks;

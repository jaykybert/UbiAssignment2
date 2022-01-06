/**
 * @file AuthorWorksList.js
 */

// React
import React, { useState } from "react";
import { Button, FlatList, View } from "react-native";
// Components
import RecommendedBook from "./RecommendedBook";
// Utilities
import * as db from "../database";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const RecommendedBooks = ({ recBooks, lookupBook, updateState }) => {
  const [books, setBooks] = useState(recBooks);

  const AddToFavourites = (key, isFavourite) => {
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
   * Callback function - called from the success callback of tx.executeSql().
   * @param {*} lookupId
   */
  const onInsertedLookup = (lookupId) => {
    for (let i = 0; i < books.length; i++) {
      if (books[i]["recommendationReason"] === "author") {
        db.insertRecommendationByAuthor(books[i], lookupId);
      } else if (books[i]["recommendationReason"] === "subject") {
        db.insertRecommendationBySubject(books[i], lookupId);
      }
    }

    // Set state to LOOKUP_COMPLETE (via props)?
    // Set modal to hidden
    updateState({ state: "LOOKUP_COMPLETE" });
  };

  const SaveToDatabase = () => {
    db.insertLookup(lookupBook, onInsertedLookup);
  };

  const WipeDatabase = () => {
    db.deleteLookup();
    db.deleteRecommendationsByAuthor();
    db.deleteRecommendationsBySubject();
  };

  const CreateDatabase = () => {
    db.createLookup();
    db.createRecommendationsByAuthor();
    db.createRecommendationsBySubject();
  };

  return (
    <View style={{ height: 575 }}>
      <FlatList
        data={recBooks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <RecommendedBook book={item} onPress={AddToFavourites} />
        )}
      />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Save to Wishlist"
          onPress={() => {
            console.log("saving...");
            SaveToDatabase();
          }}
        />
      </View>
    </View>
  );
};

export default RecommendedBooks;

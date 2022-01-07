/**
 * @file WishlistBooks.js
 */

// React
import React, { useState } from "react";
import { Button, FlatList, View } from "react-native";
// Components
import WishlistBook from "./WishlistBook";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const WishlistBooks = ({
  wishlistBooks,
  unfavouriteAuthorBook,
  unfavouriteSubjectBook,
}) => {
  return (
    <FlatList
      data={wishlistBooks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <WishlistBook
          book={item}
          onUnfavouriteBook={
            item.hasOwnProperty("lookupSubject")
              ? unfavouriteSubjectBook
              : unfavouriteAuthorBook
          }
        />
      )}
    />
  );
};

export default WishlistBooks;

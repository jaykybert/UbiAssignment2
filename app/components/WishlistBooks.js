/**
 * @file WishlistBooks.js
 *
 * Contains the WishlistBooks component.
 */

// React
import React from "react";
import { FlatList } from "react-native";
// Components
import WishlistBook from "./WishlistBook";

/**
 * @function WishlistBooks
 * @param {array} wishlistBooks - array of objects containing wishlisted books.
 * @param {function} unfavouriteAuthorBook - function from WishlistBooksScreen component.
 * @param {function} unfavouriteSubjectBook - function from WishlistBooksScreen component.
 *
 * Flatlist of all wishlisted books (from both recsByAuthor and recsBySubject).
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

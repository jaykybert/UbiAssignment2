/**
 * @file WishlistBooksScreen.js
 *
 * Contains the WishlistBooksScreen component.
 */

// React & Navigation
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Components
import WishlistBooks from "../components/WishlistBooks";
// Styles
import { emptyWishlist } from "../styles";
// Database
import * as db from "../database";

/**
 * @function WishlistBooksScreen
 *
 * A component containing a list of all recommended books.
 * Responsible for getting and deleting books from the wishlist.
 */
const WishlistBooksScreen = () => {
  // Screen re-render on navigation (doesn't by default).
  const isFocused = useIsFocused();

  const [gotBooks, setGotBooks] = useState(false);
  const [books, setBooks] = useState();

  useEffect(() => {
    db.selectFavouritedRecommendationsByAuthor(onRecsByAuthorRetrieved);
  }, [isFocused]);

  /**
   * @function onRecsByAuthorRetrieved
   * @param {array} recAuthorBooks - an array of objects from recsByAuthor table.
   *
   * Called when all favourited recsByAuthor entries have been retrieved.
   * Get the favourited recsBySubject entries.
   */
  const onRecsByAuthorRetrieved = (recAuthorBooks) => {
    /**
     * @function onRecsBySubjectRetrieved
     * @param {array} recSubjectBooks - an array of objects from recsBySubject table.
     *
     * Called when all favourited recsBySubject entries have been retrieved.
     * Join recSubjectBooks with recAuthorBooks, update state.
     */
    const onRecsBySubjectRetrieved = (recSubjectBooks) => {
      let recBooks = recAuthorBooks.concat(recSubjectBooks);

      // Code to remove duplicates found here:
      // https://stackoverflow.com/questions/32634736/javascript-object-array-removing-objects-with-duplicate-properties
      recBooks = recBooks.reduce(function (prev, current) {
        if (
          !prev.some(function (element) {
            return element.key === current.key;
          })
        )
          prev.push(current);
        return prev;
      }, []);
      setBooks(recBooks);
      setGotBooks(true);
    };

    db.selectFavouritedRecommendationsBySubject(onRecsBySubjectRetrieved);
  };

  /**
   * @function unfavouriteAuthorBook
   * @param {string} - the key of the entry inside recsByAuthor to unfavourite.
   */
  const unfavouriteAuthorBook = (key) => {
    db.unfavouriteRecommendationByAuthor(key, onBookUnfavourited);
  };

  /**
   * @function unfavouriteSubjectBook
   * @param {string} bookId - the key of the entry inside recsBySubject to unfavourite.
   */
  const unfavouriteSubjectBook = (key) => {
    db.unfavouriteRecommendationBySubject(key, onBookUnfavourited);
  };

  /**
   * @function onBookUnfavourited
   *
   * A callback function called when a book has been unfavourited from the database.
   */
  const onBookUnfavourited = () => {
    setGotBooks(false);
    db.selectFavouritedRecommendationsByAuthor(onRecsByAuthorRetrieved);
  };

  // Got books.
  if (gotBooks) {
    // No books stored.
    if (books.length === 0) {
      return (
        <View style={emptyWishlist.default}>
          <Text>Wishlist empty.</Text>
          <MaterialCommunityIcons name="emoticon-sad-outline" size={100} />
        </View>
      );
    }
    // Books stored.
    else {
      return (
        <View>
          <WishlistBooks
            wishlistBooks={books}
            unfavouriteAuthorBook={unfavouriteAuthorBook}
            unfavouriteSubjectBook={unfavouriteSubjectBook}
          />
        </View>
      );
    }
  }
  // Getting books.
  else {
    return (
      <View style={emptyWishlist.default}>
        <ActivityIndicator size="large" color="black" animating={!gotBooks} />
      </View>
    );
  }
};

export default WishlistBooksScreen;

// React & Navigation
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Components
import WishlistBooks from "../components/WishlistBooks";
// Styles
import { emptyWishlist } from "../styles";
// Database
import * as db from "../database";

/**
 * TODO
 * @returns
 */
const WishlistBooksScreen = () => {
  // Screen re-render on navigation (doesn't by default).
  const isFocused = useIsFocused();

  const [gotBooks, setGotBooks] = useState(false);
  const [books, setBooks] = useState();

  useEffect(() => {
    setGotBooks(false);
  }, [isFocused]);

  const onRecsByAuthorRetrieved = (recAuthorBooks) => {
    const onRecsBySubjectRetrieved = (recSubjectBooks) => {
      // concat here
      let recBooks = recAuthorBooks.concat(recSubjectBooks);
      setBooks(recBooks);
      setGotBooks(true);
    };

    // Got recommendations from author, now from subject table.
    db.selectFavouritedRecommendationsBySubject(onRecsBySubjectRetrieved);
  };

  const unfavouriteAuthorBook = (bookId) => {
    db.deleteRecommendationByAuthor(bookId, onUnfavouritedBookDeleted);
  };

  const unfavouriteSubjectBook = (bookId) => {
    db.deleteRecommendationBySubject(bookId, onUnfavouritedBookDeleted);
  };

  const onUnfavouritedBookDeleted = () => {
    setGotBooks(false);
  };

  if (!gotBooks) {
    db.selectFavouritedRecommendationsByAuthor(onRecsByAuthorRetrieved);
  }

  if (gotBooks) {
    if (books.length === 0) {
      return (
        <View style={emptyWishlist.default}>
          <Text>Wishlist empty.</Text>
          <MaterialCommunityIcons name="emoticon-sad-outline" size={100} />
        </View>
      );
    }
    return (
      <View>
        <WishlistBooks
          wishlistBooks={books}
          unfavouriteAuthorBook={unfavouriteAuthorBook}
          unfavouriteSubjectBook={unfavouriteSubjectBook}
        />
      </View>
    );
  } else {
    return (
      <View style={emptyWishlist.default}>
        <ActivityIndicator size="large" color="black" animating={!gotBooks} />
      </View>
    );
  }
};

export default WishlistBooksScreen;

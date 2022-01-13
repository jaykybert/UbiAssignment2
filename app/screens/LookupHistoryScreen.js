/**
 * @file LookupHistoryScreen.js
 *
 * Contains the LookupHistoryScreen component.
 */

// React & Navigation
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Components
import LookupBooks from "../components/LookupBooks";
// Styles
import { emptyWishlist } from "../styles";
// Database
import * as db from "../database";

/**
 * @function LookupHistoryScreen
 *
 * A component for listing all of the looked up books.
 * Responsible for deleting looked up books.
 */
const LookupHistoryScreen = () => {
  // Screen re-render on navigation (doesn't by default).
  const isFocused = useIsFocused();

  const [gotBooks, setGotBooks] = useState(false);
  const [books, setBooks] = useState();

  useEffect(() => {
    db.selectLookupBooks(onLookupBooksRecieved);
  }, [isFocused]);

  /**
   * @function onLookupBooksRecieved
   * @param {array} lookupBooks - an array of objects from the lookup table.
   *
   * A function called when all entries in the lookup table have been retrieved.
   */
  const onLookupBooksRecieved = (lookupBooks) => {
    setBooks(lookupBooks);
    setGotBooks(true);
  };

  /**
   * @function onDeleteLookup
   * @param {number} lookupId - the id of the lookup book to be deleted in the lookup table.
   *
   * Call the database function to delete the specified lookup book.
   */
  const onDeleteLookup = (lookupId) => {
    db.deleteLookupBook(lookupId, onLookupBookDeleted);
  };

  /**
   * @function onLookupBookDeleted
   *
   * A function called when a lookup book has been deleted.
   * Re-query the database for the books.
   */
  const onLookupBookDeleted = () => {
    setGotBooks(false);
    db.selectLookupBooks(onLookupBooksRecieved);
  };

  // Got books.
  if (gotBooks) {
    // No books stored.
    if (books.length === 0) {
      return (
        <View style={emptyWishlist.default}>
          <Text>No books searches stored.</Text>
          <MaterialCommunityIcons name="emoticon-sad-outline" size={100} />
        </View>
      );
    }
    // Books stored.
    else {
      return (
        <View>
          <LookupBooks lookupBooks={books} onDeleteLookup={onDeleteLookup} />
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

export default LookupHistoryScreen;

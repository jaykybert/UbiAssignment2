/**
 * @file LookupBooks.js
 *
 * Contains the LookupBooks component.
 */

// React
import React from "react";
import { FlatList } from "react-native";
// Components
import LookupBook from "./LookupBook";

/**
 * @function LookupBooks
 *
 * Flatlist of all looked up books.
 */
const LookupBooks = ({ lookupBooks, onDeleteLookup }) => {
  return (
    <FlatList
      data={lookupBooks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LookupBook book={item} onDeleteLookup={onDeleteLookup} />
      )}
    />
  );
};

export default LookupBooks;

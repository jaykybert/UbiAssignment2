/**
 * @file AuthorWorksList.js
 */

// React
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, FlatList, View } from "react-native";
// Components
import RecommendedBook from "./RecommendedBook";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const RecommendedBooks = ({ recBooks }) => {
  const [books, setBooks] = useState(recBooks);

  const AddToFavourites = (key, isFavourite) => {
    for (let i = 0; i < books.length; i++) {
      if (books[i]["key"] === key) {
        // Match, update property
        let booksCopy = books;

        booksCopy[i]["favourited"] = isFavourite;
        setBooks(booksCopy);
      }
    }
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
            Alert.alert({ books });
          }}
        ></Button>
      </View>
    </View>
  );
};

export default RecommendedBooks;

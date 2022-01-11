/**
 * @file RecommendedBook.js
 *
 * Contains the RecommendedBook component.
 */

// React
import React, { useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Styles
import { colors, authorWorks } from "../styles";

/**
 * @function RecommendedBook
 * @param {object} book - object containing book information to be displayed.
 * @param {function} onPress - function from RecommendedBooks to be called when favouriting a book.
 *
 * A list item inside RecommendedBooks' flatlist.
 * Controls favourited UI state.
 */
const RecommendedBook = ({ book, addToFavourites }) => {
  const [favourited, setFavourited] = useState(false);

  // Determine local (default) or network cover.
  let cover =
    book["cover"] !== "" ? (
      <Image source={{ uri: book["cover"], width: 130, height: 200 }} />
    ) : (
      <Image
        source={require("../assets/default-book.bmp")}
        style={authorWorks.cover}
      ></Image>
    );

  let favouriteStar;

  // Favourited Star
  if (favourited) {
    favouriteStar = (
      <View style={authorWorks.favouriteView}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#fff"
          onPress={() => {
            setFavourited(false);
            addToFavourites(book["key"], false);
          }}
        >
          <MaterialCommunityIcons name="star" size={75} color={colors.gold} />
        </TouchableHighlight>
        <Text style={authorWorks.favouriteText}>Remove</Text>
      </View>
    );
  }
  // Unfavourited Star
  else {
    favouriteStar = (
      <View style={authorWorks.favouriteView}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#fff"
          onPress={() => {
            setFavourited(true);
            addToFavourites(book["key"], true);
          }}
        >
          <MaterialCommunityIcons
            name="star-outline"
            size={75}
            color={colors.gold}
          />
        </TouchableHighlight>
        <Text style={authorWorks.favouriteText}>Add</Text>
      </View>
    );
  }

  // Source - recsByAuthor
  if (book["recommendationReason"] === "author") {
    return (
      <View style={authorWorks.container}>
        <Text style={authorWorks.title}>{book["title"]}</Text>
        <Text style={authorWorks.author}>{book["author"]}</Text>

        <View style={authorWorks.content}>
          <View style={authorWorks.imageView}>{cover}</View>
          {favouriteStar}
        </View>
      </View>
    );
  }
  // Source - recsBySubject
  else {
    let tags = book["subjects"].join(", ");

    return (
      <View style={authorWorks.container}>
        <Text style={authorWorks.title}>{book["title"]}</Text>
        <Text style={authorWorks.author}>{book["author"]}</Text>

        <View style={authorWorks.content}>
          <View style={authorWorks.imageView}>{cover}</View>
          {favouriteStar}
        </View>
        <View style={authorWorks.tagsView}>
          <Text>Tags: {tags}</Text>
        </View>
      </View>
    );
  }
};

export default RecommendedBook;

/**
 * @file RecommendedBook.js
 *
 * TODO
 */

// React
import React, { useState } from "react";
import {
  AlertIOS,
  Image,
  Platform,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Styles
import { colors, authorWorks } from "../styles";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const RecommendedBook = ({ book, onPress }) => {
  const [favourited, setFavourited] = useState(false);

  /**
   * TODO
   * @param {} favouritedState
   */
  const Notify = (favouritedState) => {
    let state = favouritedState ? " added" : " removed";
    let message = `${book["title"]}${state}`;

    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  };

  let cover;
  // Cover url.
  if (book["cover"] !== "") {
    cover = <Image source={{ uri: book["cover"], width: 120, height: 200 }} />;
  }
  // No cover url.
  else {
    cover = (
      <Image
        source={require("../assets/default-book.bmp")}
        style={authorWorks.cover}
      ></Image>
    );
  }

  let favouriteStar;
  if (favourited) {
    // Gold star, unfavourite text
    favouriteStar = (
      <View style={authorWorks.textView}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#fff"
          onPress={() => {
            Notify(false);
            setFavourited(false);
            onPress(book["key"], false);
          }}
        >
          <MaterialCommunityIcons name="star" size={75} color={colors.gold} />
        </TouchableHighlight>
        <Text style={authorWorks.favouriteText}>Remove</Text>
      </View>
    );
  } else {
    // Outlined star, favourite this text.
    favouriteStar = (
      <View style={authorWorks.textView}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#fff"
          onPress={() => {
            Notify(true);
            setFavourited(true);
            onPress(book["key"], true);
          }}
        >
          <MaterialCommunityIcons name="star-outline" size={75} color="#000" />
        </TouchableHighlight>
        <Text style={authorWorks.favouriteText}>Add</Text>
      </View>
    );
  }

  // Recommendation - same author.
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
  // Recommendation - similar subjects.
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

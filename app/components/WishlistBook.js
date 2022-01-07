/**
 * @file WishlistBook.js
 *
 * TODO
 */

// React
import React, { useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";

// Styles
import { wishlistAuthorBooks } from "../styles";
import ModalWishlistAuthorRec from "./modal-views/ModalWishlistAuthorRec";
import ModalWishlistSubjectRec from "./modal-views/ModalWishlistSubjectRec";

/**
 * TODO
 * @param {*} param0
 * @returns
 */
const WishlistBook = ({ book, onUnfavouriteBook }) => {
  const [modalVisible, setModalVisible] = useState(false);

  let cover =
    book["cover"] !== "" ? (
      <Image source={{ uri: book["cover"], width: 120, height: 200 }} />
    ) : (
      <Image
        source={require("../assets/default-book.bmp")}
        style={wishlistAuthorBooks.cover}
      ></Image>
    );

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.4}
        underlayColor="#ffffff"
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View style={wishlistAuthorBooks.item}>
          <View>
            <Text style={wishlistAuthorBooks.title}>{book["title"]}</Text>
            <Text style={wishlistAuthorBooks.author}>{book["author"]}</Text>
          </View>
          <View>{cover}</View>
        </View>
      </TouchableHighlight>

      {book.hasOwnProperty("lookupSubject") ? (
        <ModalWishlistSubjectRec
          book={book}
          coverImage={cover}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onUnfavouriteBook={onUnfavouriteBook}
        />
      ) : (
        <ModalWishlistAuthorRec
          book={book}
          coverImage={cover}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onUnfavouriteBook={onUnfavouriteBook}
        />
      )}
    </View>
  );
};

export default WishlistBook;

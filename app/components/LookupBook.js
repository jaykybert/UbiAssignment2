/**
 * @file LookupBook.js
 *
 * Contains the LookupBook component.
 */

// React
import React, { useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
// Components
import ModalLookupBook from "./modal-views/ModalLookupBook";
// Styles
import { colors, lookupBook } from "../styles";

/**
 * @function LookupBook
 * @param {object} book - an object containing lookup book information.
 *
 * List item inside LookupBooks. Displays book information.
 */
const LookupBook = ({ book, onDeleteLookup }) => {
  const [modalVisible, setModalVisible] = useState(false);

  let cover =
    book["cover"] !== "" ? (
      <Image source={{ uri: book["cover"], width: 130, height: 200 }} />
    ) : (
      <Image
        source={require("../assets/default-book.bmp")}
        style={lookupBook.cover}
      ></Image>
    );

  let sentence =
    book["sentence"] !== "" ? `'${book["sentence"]}'` : "No excerpt provided.";

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.4}
        underlayColor={colors.white}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View style={lookupBook.item}>
          <View style={lookupBook.headingView}>
            <Text style={lookupBook.title}>{book["title"]}</Text>
            <Text style={lookupBook.author}>{book["author"]}</Text>
          </View>
          <View style={lookupBook.horizontalView}>
            <View style={lookupBook.textView}>
              <Text style={lookupBook.subHeading}>Searched</Text>
              <Text style={lookupBook.generalText}>{book["date"]}</Text>
              <Text style={lookupBook.subHeading}>Publisher</Text>
              <Text style={lookupBook.generalText}>{book["publisher"]}</Text>
              <Text style={lookupBook.subHeading}>Published</Text>
              <Text style={lookupBook.generalText}>{book["published"]}</Text>
              <Text style={lookupBook.subHeading}>Pages</Text>
              <Text style={lookupBook.generalText}>{book["pages"]}</Text>
            </View>
            <View style={lookupBook.coverView}>{cover}</View>
          </View>
          <View style={lookupBook.excerptView}>
            <Text style={lookupBook.author}>{sentence}</Text>
          </View>
        </View>
      </TouchableHighlight>

      <ModalLookupBook
        book={book}
        coverImage={cover}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDeleteLookup={onDeleteLookup}
      />
    </View>
  );
};

export default LookupBook;

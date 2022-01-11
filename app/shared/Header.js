/**
 * @file Header.js
 *
 * Contains the Header component.
 */

// React
import React from "react";
import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Styles
import { colors, header } from "../styles";

/**
 * @function Header
 *
 * A customised Header containing an icon and text.
 */
const Header = () => {
  return (
    <View style={header.container}>
      <View style={header.icon}>
        <MaterialCommunityIcons
          name="bookshelf"
          size={34}
          color={colors.black}
        />
      </View>

      <View style={header.textView}>
        <Text style={header.text}>Next Read</Text>
      </View>
    </View>
  );
};

export default Header;

// React & Navigation
import React from "react";
import { Text, View } from "react-native";
// Components

import SearchISBN from "../components/SearchISBN";

// Styles
import { container } from "../styles";

/**
 * TODO
 * @returns
 */
const LookupScreen = () => {
  return (
    <View style={container.container}>
      <SearchISBN />
    </View>
  );
};

export default LookupScreen;

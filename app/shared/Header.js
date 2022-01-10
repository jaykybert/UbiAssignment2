// React
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/**
 * @function Header
 */
const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="bookshelf" size={34} color="#000" />
      </View>

      <View style={styles.textView}>
        <Text style={styles.text}>Next Read</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  icon: {},
  textView: {
    marginLeft: 5,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default Header;

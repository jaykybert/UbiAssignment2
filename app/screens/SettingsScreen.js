/**
 * @file SettingsScreen.js
 *
 * Contains the SettingsScreen component.
 */

// React
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * @function SettingsScreen
 *
 * Not implemented.
 */
const SettingsScreen = () => {
  return (
    <View style={styles.empty}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsScreen;

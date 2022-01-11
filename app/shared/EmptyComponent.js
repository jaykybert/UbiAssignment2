/**
 * @file EmptyComponent.js
 *
 * Contains EmptyComponent.
 */

// React
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * @function EmptyComponent
 * A placeholder component used to flesh out navigation.
 */
const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <Text>...</Text>
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

export default EmptyComponent;

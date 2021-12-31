// React
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * @function EmptyComponent
 * A placeholder component used to flesh out navigation.
 */
const EmptyComponent = () => {
  return (
    <View style={styles.Empty}>
      <Text>...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EmptyComponent;

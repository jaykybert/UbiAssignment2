// React & Navigation
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// Components
import HomescreenStack from "./app/navigation/HomescreenStack";

/**
 * TODO
 * @returns
 */
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <HomescreenStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

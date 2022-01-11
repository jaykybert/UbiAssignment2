/**
 * @file HomescreenStack.js
 *
 * Contains the HomescreenStack component.
 */

// React & Navigation
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Components
import BottomTabs from "./BottomTabs";
import Header from "../shared/Header";

const homeStack = createNativeStackNavigator();

/**
 * @function HomescreenStack
 *
 * Outer-most navigation component, with a custom header.
 * Contains the BottomTabs component.
 */
const HomescreenStack = () => {
  return (
    <homeStack.Navigator
      screenOptions={{
        headerTitle: () => <Header />,
      }}
    >
      <homeStack.Screen name="Find a Book" component={BottomTabs} />
    </homeStack.Navigator>
  );
};

export default HomescreenStack;

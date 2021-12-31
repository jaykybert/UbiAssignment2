// React & Navigation
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Components
import BottomTabs from "./BottomTabs";
import Header from "../shared/Header";

const homeStack = createNativeStackNavigator();

const HomescreenStack = () => {
  return (
    // TODO: Add custom header?
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

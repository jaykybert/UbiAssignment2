// React & Navigation
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// Components
import EmptyComponent from "../shared/EmptyComponent";

const Tabs = createMaterialTopTabNavigator();

/**
 * TODO
 * @returns
 */
const BooksTopTabs = () => {
  return (
    <Tabs.Navigator initialRotueName="Recommended">
      <Tabs.Screen name="Recommendations" component={EmptyComponent} />
      <Tabs.Screen name="History" component={EmptyComponent} />
    </Tabs.Navigator>
  );
};

export default BooksTopTabs;

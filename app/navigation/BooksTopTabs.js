// React & Navigation
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// Components
import LookupHistoryScreen from "../screens/LookupHistoryScreen";
import WishlistBooksScreen from "../screens/WishlistBooksScreen";

const Tabs = createMaterialTopTabNavigator();

/**
 * TODO
 * @returns
 */
const BooksTopTabs = () => {
  return (
    <Tabs.Navigator initialRotueName="Wishlist">
      <Tabs.Screen name="Wishlist" component={WishlistBooksScreen} />
      <Tabs.Screen name="History" component={LookupHistoryScreen} />
    </Tabs.Navigator>
  );
};

export default BooksTopTabs;

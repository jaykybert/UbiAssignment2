// React & Navigation
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// Components
import LookupHistoryScreen from "../screens/LookupHistoryScreen";
import WishlistBooksScreen from "../screens/WishlistBooksScreen";
// Styles
import { colors } from "../styles";

const Tabs = createMaterialTopTabNavigator();

/**
 * TODO
 * @returns
 */
const BooksTopTabs = () => {
  return (
    <Tabs.Navigator initialRotueName="Wishlist">
      <Tabs.Screen
        name="Wishlist"
        component={WishlistBooksScreen}
        options={{
          tabBarIndicatorStyle: { backgroundColor: colors.darkGreen },
        }}
      />
      <Tabs.Screen
        name="History"
        component={LookupHistoryScreen}
        options={{
          tabBarIndicatorStyle: { backgroundColor: colors.darkGreen },
        }}
      />
    </Tabs.Navigator>
  );
};

export default BooksTopTabs;

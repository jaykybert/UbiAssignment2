/**
 * @file BottomTabs.js
 *
 * Contains the BottomTabs component.
 */

// React & Navigation
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Components
import BooksTopTabs from "./BooksTopTabs.js";
import SearchISBN from "../screens/SearchISBN.js";
import SettingsScreen from "../screens/SettingsScreen.js";
// Styles
import { colors } from "../styles.js";

const Root = createMaterialBottomTabNavigator();

/**
 * @function BottomTabs
 *
 * Contains three separate components accessed via bottom tabs.
 *    > LEFT: BooksTopTabs
 *    > CENTRE: SearchISBN
 *    > RIGHT: EmptyComponent
 */
const BottomTabs = () => {
  return (
    <Root.Navigator
      initialRouteName="Camera"
      activeColor={colors.white}
      inactiveColor="#1f1f1f"
      backBehaviour="none"
      barStyle={{ backgroundColor: colors.darkGreen }}
    >
      <Root.Screen
        name="Books"
        component={BooksTopTabs}
        options={{
          tabBarLabel: "Books",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={24} />
          ),
        }}
      />

      <Root.Screen
        name="Camera"
        component={SearchISBN}
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={24} />
          ),
        }}
      />

      <Root.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={24} />
          ),
        }}
      />
    </Root.Navigator>
  );
};

export default BottomTabs;

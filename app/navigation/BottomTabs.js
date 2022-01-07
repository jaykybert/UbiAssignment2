// React & Navigation
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Components
import BooksTopTabs from "./BooksTopTabs.js";
import Camera from "../screens/Camera.js";
import EmptyComponent from "../shared/EmptyComponent.js";

const Root = createMaterialBottomTabNavigator();

/**
 * TODO
 * @returns
 */
const BottomTabs = () => {
  return (
    <Root.Navigator
      initialRouteName="Camera"
      activeColor="#ffffff"
      inactiveColor="#1f1f1f"
      shifting={true}
      backBehaviour="none"
    >
      <Root.Screen
        name="Books"
        component={BooksTopTabs}
        options={{
          tabBarColor: "#256f5a",
          tabBarLabel: "Books",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={24} />
          ),
        }}
      />

      <Root.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarColor: "#256f5a",
          tabBarLabel: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={24} />
          ),
        }}
      />

      <Root.Screen
        name="Settings"
        component={EmptyComponent}
        options={{
          tabBarColor: "#256f5a",
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

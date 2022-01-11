/**
 * @file App.js
 *
 * Contains the App component.
 */

// React & Navigation
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// Components
import HomescreenStack from "./app/navigation/HomescreenStack";
// Styles
import { app } from "./app/styles";
// Database
import * as db from "./app/database";

/**
 * @function App
 *
 * Entry point of application.
 * Contains HomescreenStack.
 */
export default function App() {
  db.createLookup();
  db.createRecommendationsByAuthor();
  db.createRecommendationsBySubject();

  return (
    <NavigationContainer style={app.container}>
      <HomescreenStack />
    </NavigationContainer>
  );
}

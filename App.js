// React & Navigation
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// Components
import HomescreenStack from "./app/navigation/HomescreenStack";
// Styles
import { app } from "./app/styles";
// Utilities
import * as db from "./app/database";

/**
 * TODO
 * @returns
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

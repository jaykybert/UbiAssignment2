// React & Navigation
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
// Database
import * as db from "../database";

/**
 * TODO
 * @returns
 */
const LookupHistoryScreen = () => {
  const [gotBooks, setGotBooks] = useState(false);
  const [books, setBooks] = useState();

  const onRecommendationsRetrieved = (recBooks) => {
    setBooks(recBooks);
    setGotBooks(true);
  };

  //
  useEffect(() => {
    db.selectRecommendationsByAuthor(onRecommendationsRetrieved);
  }, []);

  if (gotBooks) {
    return (
      <View>
        <Text>got the books my friend</Text>
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size="large" color="black" animating={!gotBooks} />
      </View>
    );
  }
};

export default LookupHistoryScreen;

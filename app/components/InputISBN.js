/**
 * @file InputISBN.js
 *
 * Contains the InputISBN component.
 */

// React
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
// Styles
import { colors, input } from "../styles";

/**
 * @function InputISBN
 * @param {object} recommendations - state variable from SearchISBN component.
 * @param {function} setRecommendations - update state function from SearchISBN component.
 *
 * Provides alternative method of entering ISBN. Simple numeric keyboard and button.
 * On button press, update state inside SearchISBN.
 */
const InputISBN = ({ recommendations, setRecommendations }) => {
  const [text, setText] = useState("");
  return (
    <View>
      <View style={input.row}>
        <View style={input.inputView}>
          <TextInput
            value={text}
            placeholder="ISBN 10/13"
            onChangeText={(text) => setText(text)}
            style={input.inputText}
            keyboardType="numeric"
          />
        </View>
        <View style={input.buttonView}>
          <Button
            title="Search"
            color={colors.darkGreen}
            onPress={() => {
              let recCopy = JSON.parse(JSON.stringify(recommendations));
              recCopy["state"] = "STARTED";
              recCopy["isbn"] = text;
              setRecommendations(recCopy);
            }}
            style={input.button}
          />
        </View>
      </View>
    </View>
  );
};

export default InputISBN;

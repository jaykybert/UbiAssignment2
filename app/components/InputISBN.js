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
  const [inputText, setInputText] = useState("");
  const [invalidISBN, setInvalidISBN] = useState(true);
  return (
    <View>
      <View style={input.row}>
        <View style={input.inputView}>
          <TextInput
            value={inputText}
            placeholder="ISBN 10/13"
            onChangeText={(text) => {
              setInputText(text);
              if (text.length === 10 || text.length === 13) {
                setInvalidISBN(false);
              } else {
                setInvalidISBN(true);
              }
            }}
            style={input.inputText}
            keyboardType="numeric"
            onEndEditing={() => {
              if (inputText.length === 10 || inputText.length === 13) {
                let recCopy = JSON.parse(JSON.stringify(recommendations));
                recCopy["state"] = "STARTED";
                recCopy["isbn"] = inputText;
                setRecommendations(recCopy);
              }
            }}
          />
        </View>
        <View style={input.buttonView}>
          <Button
            disabled={invalidISBN}
            title="Search"
            color={colors.darkGreen}
            onPress={() => {
              let recCopy = JSON.parse(JSON.stringify(recommendations));
              recCopy["state"] = "STARTED";
              recCopy["isbn"] = inputText;
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

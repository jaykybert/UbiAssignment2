// React
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
// Styles
import { input } from "../styles";

const InputISBN = ({ startLookup, setModalVisible }) => {
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
          />
        </View>
        <View style={input.buttonView}>
          <Button
            title="Search"
            onPress={() => {
              console.log("Searching for " + text);
              setModalVisible(true);
              startLookup(text);
            }}
            style={input.button}
          />
        </View>
      </View>
    </View>
  );
};

export default InputISBN;

/**
 * @file ScanISBN.js
 *
 * Contains the ScanISBN component.
 */

// React
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
// Styles
import { scanner, colors } from "../styles";

/**
 * @function ScanISBN
 * @param {object} recommendations - state variable from SearchISBN component.
 * @param {function} setRecommendations - update state function from SearchISBN component.
 *
 * Main method of getting ISBN. Uses camera to scan barcode, then updates SearchISBN state.
 */
const ScanISBN = ({ recommendations, setRecommendations }) => {
  const [permission, setPermission] = useState(null);

  const isFocused = useIsFocused();

  /**
   * @function getCameraPermission
   *
   * Asynchronous function, await camera permission.
   * Update state accordingly.
   */
  async function getCameraPermission() {
    const statusObj = await Camera.requestCameraPermissionsAsync();
    setPermission(statusObj["status"] === "granted");
  }

  useEffect(() => {
    async function setupPermissions() {
      await getCameraPermission();
    }
    setupPermissions();
  }, [isFocused]);

  // Permissions Not Set
  if (permission === null) {
    return (
      <View style={scanner.container}>
        <Text style={scanner.permissionText}>
          Camera permissions pending...
        </Text>
        <ActivityIndicator size="large" color={colors.darkGreen} />
      </View>
    );
  }
  // Permission Rejected
  else if (permission === false) {
    return (
      <View style={scanner.container}>
        <Text style={scanner.permissionText}>Cannot use camera.</Text>
        <Image
          source={require("../assets/no-camera.png")}
          style={scanner.image}
        ></Image>
        <Button
          title="Allow camera?"
          style={scanner.button}
          color={colors.darkGreen}
          onPress={() => {
            getCameraPermission();
          }}
        ></Button>
      </View>
    );
  }
  // Permission Granted
  else {
    return (
      <View style={scanner.container}>
        {isFocused && (
          <Camera
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={({ type, data }) => {
              let recCopy = JSON.parse(JSON.stringify(recommendations));
              recCopy["state"] = "STARTED";
              recCopy["isbn"] = data;
              setRecommendations(recCopy);
            }}
          />
        )}
      </View>
    );
  }
};

export default ScanISBN;

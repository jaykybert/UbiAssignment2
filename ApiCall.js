import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Not in use

const isbn = "0140306765";

export default function App() {
  const [data, setData] = useState("");

  function fetchBooks(isbn) {
    fetch(`https://openlibrary.org/isbn/${isbn}.json`).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setData(data);
      });
    });
  }

  useEffect(() => {
    async function getData() {
      try {
        fetchBooks(isbn);
      } catch (ex) {
        console.warn(ex);
      }
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{data["title"]}</Text>

      <Image
        source={{
          uri: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
        }}
        style={{ width: 180, height: 279 }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

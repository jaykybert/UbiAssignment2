// React
import { StyleSheet } from "react-native";

// Colours
export const colors = {
  gold: "#ffd327",
  darkGreen: "#256f5a",
  black: "#000000",
  white: "#ffffff",
};

export const modal = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  centeredView: {
    flex: 1,
    marginTop: 70,
  },
  modalView: {
    margin: 15,
    backgroundColor: "#f6f6f6",
    borderRadius: 25,
    paddingTop: 30,
    paddingBottom: 5,
    alignItems: "center",
    elevation: 15,
  },
});

export const authorWorks = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: colors.darkGreen,
    borderTopWidth: 4,
    marginBottom: 5,
    paddingHorizontal: 5,
    flex: 1,
  },
  title: {
    color: "#262727",
    fontSize: 18,
    fontWeight: "bold",
  },
  cover: {
    height: 200,
    width: 140,
  },
  author: {
    fontStyle: "italic",
  },
  content: {
    flexDirection: "row",
    marginTop: 10,
  },
  imageView: {
    marginLeft: 20,
    marginRight: 5,
  },
  textView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tagsView: {},
  favouriteText: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: -10,
  },
});

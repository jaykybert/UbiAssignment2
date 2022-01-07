// React
import { StyleSheet } from "react-native";

// Colours
export const colors = {
  gold: "#ffd327",
  darkGreen: "#256f5a",
  black: "#000000",
  white: "#ffffff",
  offWhite: "#fbfbfc",
};

// App
export const app = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Text Input
export const input = StyleSheet.create({
  row: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.black,
    borderStyle: "solid",
    flexDirection: "row",
    margin: 3,
    paddingVertical: 0,
  },
  inputView: {
    paddingLeft: 10,
    flex: 1,
  },
  inputText: {
    fontSize: 20,
    fontStyle: "italic",
  },
  buttonView: {
    borderLeftWidth: 2,
    borderColor: colors.black,
  },
});

// Container
export const container = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

// Modal
export const modal = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    marginVertical: 5,
  },
  centeredView: {
    flex: 1,
    marginTop: 60,
  },
  modalView: {
    margin: 15,
    backgroundColor: "#f6f6f6",
    borderRadius: 25,
    paddingTop: 10,
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
  favouriteView: {
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

export const wishlistAuthorBooks = StyleSheet.create({
  item: {
    marginTop: 10,
    paddingBottom: 10,
    backgroundColor: "#edf3f0",
    alignItems: "center",
    borderTopColor: colors.black,
    borderTopWidth: 1,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  headingView: {
    marginBottom: 10,
  },
  coverView: {
    borderColor: colors.darkGreen,
    borderWidth: 2,
    elevation: 5,
    backgroundColor: "red",
  },
  buttonView: {
    marginVertical: 10,
    backgroundColor: "red",
    width: 150,
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 2,
  },
  descriptionView: {
    backgroundColor: colors.offWhite,
    borderColor: colors.darkGreen,
    borderRadius: 20,
    borderWidth: 2,
    elevation: 5,
    padding: 10,
    margin: 10,
  },
  cover: {
    height: 200,
    width: 140,
  },

  title: {
    color: "#262727",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontStyle: "italic",
    textAlign: "center",
  },
  favouriteText: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: -10,
    textAlign: "center",
  },
});

// Empty Wishlist
export const emptyWishlist = StyleSheet.create({
  default: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

// React
import { StyleSheet } from "react-native";

// Colours
export const colors = {
  gold: "#ffd327",
  darkGreen: "#256f5a",
  darkGrey: "#262727",
  black: "#000000",
  white: "#ffffff",
  offWhite: "#fbfbfc",
  tan: "#ebefe1",
};

// App
export const app = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

// ISBN Input
export const input = StyleSheet.create({
  row: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.black,
    borderStyle: "solid",
    flexDirection: "row",
    marginHorizontal: 5,
  },
  inputView: {
    paddingLeft: 5,
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

// Screen Container
export const container = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

// Lookup
export const controller = StyleSheet.create({
  container: {
    backgroundColor: colors.offWhite,
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
    backgroundColor: colors.offWhite,
    justifyContent: "center",
    alignItems: "center",

    borderColor: colors.darkGreen,
    borderWidth: 2,
    borderRadius: 5,

    marginBottom: 10,
    marginHorizontal: 5,
    padding: 5,
    flex: 1,
  },
  title: {
    color: "#262727",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cover: {
    height: 200,
    width: 130,
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
    marginVertical: 5,
    marginHorizontal: 5,
    paddingBottom: 10,
    backgroundColor: colors.offWhite,
    alignItems: "center",
    borderColor: colors.darkGreen,
    borderWidth: 2,
    borderRadius: 5,
  },
  headingView: {
    marginBottom: 10,
  },
  coverView: {
    borderColor: colors.darkGreen,
    borderWidth: 2,
    elevation: 5,
  },
  buttonView: {
    marginVertical: 10,
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
    width: 130,
  },

  title: {
    color: colors.darkGrey,
    fontSize: 18,
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

// Camera / Barcode Scanner
export const scanner = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  permissionText: {
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
});

// Header
export const header = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  icon: {},
  textView: {
    marginLeft: 5,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

// Lookup Book Item
export const lookupBook = StyleSheet.create({
  item: {
    marginVertical: 5,
    marginHorizontal: 5,
    paddingBottom: 10,
    backgroundColor: colors.offWhite,
    alignItems: "center",
    borderColor: colors.darkGreen,
    borderWidth: 2,
    borderRadius: 5,
  },
  headingView: {
    marginBottom: 10,
  },
  horizontalView: {
    flexDirection: "row",
  },
  textView: {
    padding: 5,
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  coverView: {
    flex: 0,
    marginHorizontal: 5,
    paddingRight: 10,
  },
  excerptView: {
    marginTop: 5,
    marginHorizontal: 10,
    padding: 5,
  },
  cover: {
    height: 200,
    width: 130,
  },
  title: {
    color: colors.darkGrey,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontStyle: "italic",
    textAlign: "center",
  },
  subHeading: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  generalText: {
    fontStyle: "italic",
  },
});

// Top of Modal
export const topOfModal = StyleSheet.create({
  view: {
    marginBottom: 5,
  },
  text: {
    fontWeight: "bold",
  },
});

// Lookup Book Modal
export const lookupBookModal = StyleSheet.create({
  scroll: {
    maxHeight: 200,
    padding: 5,
    margin: 10,
    borderColor: colors.darkGreen,
    borderWidth: 2,
    borderRadius: 10,
  },
});

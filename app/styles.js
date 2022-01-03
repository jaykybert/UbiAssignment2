import { StyleSheet } from "react-native";

/**
 * TODO
 */
export const modal = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  imageLarge: {
    width: 60,
    height: 60,
  },
  centeredView: {
    flex: 1,
    marginTop: 100,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#e12222",
    padding: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
  },
});

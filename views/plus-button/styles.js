import { StyleSheet } from "react-native";
export default StyleSheet.create({
  Text: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 45,
    fontSize: 30
  },
  Button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff0000",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,

    elevation: 5
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  }
});

import { StyleSheet } from "react-native";
export default StyleSheet.create({
  exercicio: {
    margin: 4,
    marginLeft: 8,
    marginRight: 8,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5
  },
  trash: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 40,
    right: 0,
    bottom: 0
  },
  edit: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 40,
    right: 40,
    bottom: 0
  }
});

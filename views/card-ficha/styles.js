import { StyleSheet } from "react-native";
export default StyleSheet.create({
  ficha: {
    borderColor: "#111",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    margin: 4,
    marginLeft: 8,
    marginRight: 8,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8

    //shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 3.84,

    //elevation: 5
  },
  trash: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 14,
    bottom: 14
  },
  edit: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 45,
    bottom: 14
  }
});

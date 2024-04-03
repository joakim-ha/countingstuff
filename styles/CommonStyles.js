import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  textItem: {
    fontSize: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "lightblue",
    borderWidth: 3,
    borderRadius: 5,
    margin: 5,
    paddingEnd: 20,
    paddingStart: 20,
  },
});

export const DeleteStyles = StyleSheet.create({
  button: {
    backgroundColor: "lightcoral",
    borderRadius: 5,
    padding: 10,
    marginLeft: "auto",
  },
  textItem: {
    fontSize: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

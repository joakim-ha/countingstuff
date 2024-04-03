import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  textItem: {
    fontSize: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightblue",
    borderWidth: 3,
    borderRadius: 5,
    margin: 5,
    paddingEnd: 20,
    paddingStart: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    flexGrow: 1, //this makes the text input expand to fill available space
    marginVertical: 10,
    marginRight: 15,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'flex-start', // positions the button to the start of the flex container
  },
  addButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

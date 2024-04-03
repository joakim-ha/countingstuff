import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={CommonStyles.textItem}>{label}</Text>
  </TouchableOpacity>
);

export const RemoveButton = ({ label, submit }) => (
  <TouchableOpacity style={styles.deleteButton} onPress={submit}>
    <Text style={CommonStyles.deleteItem}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  deleteButton: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "red",
    alignItems: "center",
  },
});

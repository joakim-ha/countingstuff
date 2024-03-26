import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit, disable }) => (
  <TouchableOpacity style={styles.button} onPress={submit} disabled={disable}>
    <Text style={CommonStyles.textItem}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});

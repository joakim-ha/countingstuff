import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && { opacity: 0.5 }]}
    onPress={submit}
    disabled={disabled}
  >
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

import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit, isDisabled }) => (
  <TouchableOpacity
    style={[styles.button, isDisabled && styles.disabledButton]}
    onPress={submit}
    disabled={isDisabled}
  >
    <Text style={[CommonStyles.textItem, isDisabled && styles.disabledText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  disabledText: {
    color: "gray",
  },
});

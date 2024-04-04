import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={submit}
    disabled={disabled} // Pass the disabled prop to TouchableOpacity
  >
    <Text style={[CommonStyles.textItem, disabled && styles.disabledText]}>
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
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledText: {
    color: "#666",
  },
});

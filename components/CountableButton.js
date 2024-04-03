import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit, style }) => {

  // check if a style is passed in, if so override the default styles
  const buttonStyle = style ? [styles.button, style] : styles.button;

  return (
    <TouchableOpacity style={buttonStyle} onPress={submit}>
      <Text style={CommonStyles.textItem}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});

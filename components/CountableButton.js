import { Text, StyleSheet, Pressable } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit, isDisabled }) => (
  <Pressable
    style={[styles.button, isDisabled ? styles.disabledButton : null]}
    onPress={submit}
    disabled={isDisabled}
  >
    <Text
      style={[CommonStyles.textItem, isDisabled ? styles.disabledText : null]}
    >
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  disabledText: {
    fontSize: 40,
    color: "gray",
  },
});

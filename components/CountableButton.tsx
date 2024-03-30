import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { CommonStyles } from "../styles/commonStyles";

// Might come in handy to define it as an interface as it grows
interface CountableButtonProps {
  label: string;
  submit: () => void;
  active?: boolean;
}

export const CountableButton: React.FC<CountableButtonProps> = ({
  label,
  submit,
  active = true,
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: active ? "lightblue" : "white" }]}
    onPress={submit}
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

import { useState } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, countables }) => {
  const [name, setName] = useState("");

  const isValidInput = (name) => {
    return !countables.some((countable) => countable.name === name);
  };

  const handleSubmit = (name) => {
    if (isValidInput(name)) {
      Keyboard.dismiss();
      addNewCountable(name);
      setName("");
    }
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter name"
        onChangeText={setName}
        value={name}
      />
      <CountableButton
        label="Add"
        submit={() => {
          handleSubmit(name);
        }}
        isDisabled={name.trim() === ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 24,
    flex: 1,
  },
});

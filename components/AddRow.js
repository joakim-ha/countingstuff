import { useState } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, countables }) => {
  const [name, setName] = useState("");

  const handleAddCountable = () => {
    let nameExists = false;
    for (let i = 0; i < countables.length; i++) {
      if (countables[i].name === name) {
        nameExists = true;
        break;
      }
    }
    if (!nameExists && name.trim() !== "") {
      addNewCountable(name);
      setName("");
      Keyboard.dismiss();
    }
  };
  return (
    <View style={CommonStyles.row}>
      <TextInput
        style={styles.textColumn}
        placeholder="Enter name"
        onChangeText={setName}
        value={name}
      />
      <CountableButton label="Add" submit={handleAddCountable} />
    </View>
  );
};

const styles = StyleSheet.create({
  addColumn: {
    flex: 0.1,
  },
  textColumn: {
    flex: 0.9,
  },
});

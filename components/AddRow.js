import { useState } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={styles.addRowContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={CommonStyles.textInput}
          placeholder="Enter name"
          onChangeText={(text) => setName(text)}
          value={name}
          maxLength={25}
        />
      </View>
      <CountableButton
        label="Add"
        submit={() => {
          addNewCountable(name);
          setName("");
          Keyboard.dismiss();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "lightblue",
    borderWidth: 3,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 45,
    paddingStart: 20,
    padding: 5,
  },
  inputContainer: {
    flex: 1,
    marginRight: 5,
  },
});

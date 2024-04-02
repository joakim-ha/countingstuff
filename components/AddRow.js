import React, { useState } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, existingNames }) => {
  const [name, setName] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(true); // State to track if name is empty

  const handleNameChange = (text) => {
    setName(text);
    setIsNameEmpty(text.trim() === ""); // Update isNameEmpty based on text input
  };

  const handleAddCountable = () => {
    if (!existingNames.includes(name)) {
      addNewCountable(name);
      setName(""); // Clear input after adding
      setIsNameEmpty(true); // Reset isNameEmpty state after adding
      Keyboard.dismiss(); // Close the keyboard
    } else {
      alert("A countable with the same name already exists!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        onChangeText={handleNameChange} // Pass the handler function
        value={name}
      />
      <CountableButton
        label="Add"
        submit={handleAddCountable}
        style={styles.addButton}
        disabled={isNameEmpty} // Disable the button when the name is empty
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
  },
});
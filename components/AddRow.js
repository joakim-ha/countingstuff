import React, { useState, useEffect } from "react";
import { View, TextInput, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, editCountable, errorMessage, initialValue }) => {
  const [name, setName] = useState("");
  const [initialValueState, setInitialValueState] = useState(initialValue);

  useEffect(() => {
    if (initialValue) {
      setName(initialValue);
      setInitialValueState(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = () => {
    addNewCountable(name);
    setName(""); 
    setInitialValueState(""); 
    Keyboard.dismiss()
  };

  const handleEdit = () => {
    console.log(
      "EDITING initialvalue: '",
      initialValue,
      "' and updated name: '",
      name,
      "'",
    );
    editCountable(initialValue, name);
    setName("");
    setInitialValueState(""); 
    Keyboard.dismiss()
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput
        placeholder={errorMessage ? errorMessage : "Enter name"}
        onChangeText={setName}
        value={name}
        style={errorMessage ? CommonStyles.errorTextInput : null}
      />
      {initialValueState ? (
        <CountableButton label="Update" submit={handleEdit} />
      ) : (
        <CountableButton label="Add" submit={handleSubmit} />
      )}
    </View>
  );
};

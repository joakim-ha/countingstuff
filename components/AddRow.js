import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";

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
  };

  const handleEdit = () => {
    console.log("EDITING");
    editCountable(initialValue);
    setName("");
    setInitialValueState(""); 
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

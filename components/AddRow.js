import { useState } from "react";
import { View, TextInput, Text } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles, DeleteStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, errorMessage }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    addNewCountable(name);
    setName("");
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput
        placeholder={errorMessage ? errorMessage : "Enter name"}
        onChangeText={setName}
        value={name}
        style={errorMessage ? CommonStyles.errorTextInput : null}
      />
      <CountableButton label="Add" submit={handleSubmit} />
    </View>
  );
};

export const RemoveRows = ({ removeAllCountables }) => {

  const handleDelete = () => {
    removeAllCountables();
  };

  return (
    <View style={DeleteStyles.row}>
      <CountableButton
        label="Remove all"
        submit={handleDelete}
        style={DeleteStyles.button}
      />
    </View>
  );
};

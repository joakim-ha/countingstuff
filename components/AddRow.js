import { useState } from "react";
import { View, TextInput } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    addNewCountable(name);
    setName("");
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" onChangeText={setName} value={name}/>
      <CountableButton label="Add" submit={handleSubmit} />
    </View>
  );
};

export const RemoveRows = ({ removeAllCountables }) => {

  const handleDelete = () => {
    removeAllCountables();
  };

  return (
    <View style={CommonStyles.row}>
      <CountableButton label="Remove all" submit={handleDelete} />
    </View>
  );
};

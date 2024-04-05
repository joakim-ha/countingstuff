import { useState } from "react";
import { View, TextInput } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  const checkNewCountable = () => {
    if (name.trim() !== "") {
      addNewCountable(name);
    } else {
      alert("Countable needs a name.");
    }
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" onChangeText={setName} />
      <CountableButton label="Add" submit={checkNewCountable} />
    </View>
  );
};

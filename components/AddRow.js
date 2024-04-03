import { useState } from "react";
import { View, TextInput, Text } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") {
      setError("Name cannot be empty");
    } else {
      setError("");
      addNewCountable(name);
    }
  };

  return (
    <View>
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
      <View style={CommonStyles.row}>
        <TextInput placeholder="Enter name" onChangeText={setName} />
        <CountableButton label="Add" submit={handleSubmit} />
      </View>
    </View>
  );
};

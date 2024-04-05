import { useState } from "react";
import { View, TextInput, Text, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, countables }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") {
      setError("Name cannot be empty");
    } else if (countables.some((countable) => countable.name === name)) {
      setError("Name already exists");
    } else {
      setError("");
      addNewCountable(name);
      setName(""); // clear the TextInput
      Keyboard.dismiss();
    }
  };

  return (
    <View>
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
      <View
        style={[
          CommonStyles.row,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <TextInput
          style={{ flex: 1, height: "100%" }}
          placeholder="Enter name"
          onChangeText={setName}
          value={name}
        />
        <CountableButton label="Add" submit={handleSubmit} />
      </View>
    </View>
  );
};

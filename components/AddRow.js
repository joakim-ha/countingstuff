import { useState } from "react";
import { View, TextInput } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ handleSubmit }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" onChangeText={setName} />
      <CountableButton
        label="Add"
        submit={() => {
          handleSubmit(name);
        }}
        isDisabled={name.trim() === ""}
      />
    </View>
  );
};

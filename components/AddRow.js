import { useState } from "react";
import { View, TextInput, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.rowContainer}>
      <View style={CommonStyles.inputContainer}>
        <TextInput
          style={CommonStyles.input}
          placeholder="Enter name"
          onChangeText={setName}
          value={name}
        />
      </View>
      <View>
        <CountableButton
          label="Add"
          submit={() => {
            addNewCountable(name);
            setName('');
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};

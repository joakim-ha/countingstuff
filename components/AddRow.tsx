import { useState } from "react";
import { View, TextInput, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/commonStyles";

interface AddRowProps {
  addNewCountable: (name: string) => void;
}

export const AddRow: React.FC<AddRowProps> = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  const clearInput = (): void => {
    setName("");
    Keyboard.dismiss();
  };

  return (
    <View style={[CommonStyles.row, { justifyContent: "space-between" }]}>
      <TextInput placeholder="Enter name" onChangeText={setName} value={name} />
      <CountableButton
        label="Add"
        submit={function (): void {
          addNewCountable(name);
          clearInput();
        }}
      />
    </View>
  );
};

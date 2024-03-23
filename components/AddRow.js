import { useState, useContext } from "react";
import { View, TextInput } from "react-native";

import { CountableButton } from "./CountableButton";
import { CountableContext } from "../providers/CountableProvider";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = () => {
  const [name, setName] = useState("");
  const countableContext = useContext(CountableContext);

  return (
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" onChangeText={setName} />
      <CountableButton
        label="Add"
        submit={() => {
          countableContext.addNewCountable(name);
        }}
      />
    </View>
  );
};

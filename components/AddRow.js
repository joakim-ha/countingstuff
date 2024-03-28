import { useState } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        <TextInput
          placeholder="Enter name"
          onChangeText={setName}
          autoCapitalize="words"
          value={name}
          style={{ fontSize: 30 }}
        />
      </View>
      <View style={styles.buttonColumn}>
        <CountableButton
          label="Add"
          submit={() => {
            if (name) {
              addNewCountable(name);
            }
            Keyboard.dismiss();
            setName("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.7,
    alignItems: "left",
  },
  buttonColumn: {
    flex: 0.3,
  },
});

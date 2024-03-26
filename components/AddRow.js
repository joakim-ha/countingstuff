import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <View style={styles.textColumn}>
        <TextInput placeholder="Enter name" onChangeText={setName} />
      </View>
      <View style={styles.buttonColumn}>
        <CountableButton
          label="Add"
          submit={() => {
            addNewCountable(name);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textColumn: {
    flex: 0.7,
    backgroundColor: "#fff",
  },
  buttonColumn: {
    flex: 0.3,
  }
});

import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={styles.addRowContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.text}
          placeholder="Enter name"
          onChangeText={setName}
        />
      </View>
      <CountableButton
        label="Add"
        submit={() => {
          addNewCountable(name);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "lightblue",
    borderWidth: 3,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 45,
    paddingStart: 20,
    padding: 5,
  },
  inputContainer: {
    flex: 1,
    marginRight: 5,
  },
  text: {
    fontSize: 20,
    flexShrink: 1,
    paddingEnd: 0,
  },
});

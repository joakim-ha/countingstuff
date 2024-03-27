import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";
import { showMessage } from "react-native-flash-message";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  const showErrorMsg = () => {  // Function that shows the error message
    showMessage({
      message: "Please enter a name",
      type: "error",
      statusBarHeight: "30",
    })
  }

  const clearInputs = () => {
    this.textInput.clear();
    setName("");
  }

  return (
    <View style={CommonStyles.row}>
      <View style={styles.textColumn}>
        <TextInput 
          ref={input => { this.textInput = input }}  // Create a reference to 'TextInput' in order to clear() it later
          placeholder="Enter name" 
          onChangeText={setName}
        />
      </View>
      <View style={styles.buttonColumn}>
        <CountableButton
          label="Add"
          submit={() => {
            name == "" ? showErrorMsg() : addNewCountable(name);
            clearInputs();
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

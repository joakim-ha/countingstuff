import { useState } from "react";
import { View, TextInput, Keyboard, Alert } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable, checkDuplicates }) => {
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
            if(name){
              if(!checkDuplicates(name)){
                addNewCountable(name);
                setName('');
              }
              else{
                Alert.alert('Name already exist in the list!', 'Try again', [
                  {text: 'OK'},
                ]);
              }
            }else{
              Alert.alert('A name must be given!', 'Try again', [
                {text: 'OK'},
              ]);
            }
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};

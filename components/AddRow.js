import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");
  
  return (
    <View style={CommonStyles.row}>
      <TextInput 
      placeholder="Enter name" 
      onChangeText={setName} 
      value ={name}
      style = {CommonStyles.textInput} 
      />
      <TouchableOpacity 
      onPress={() => {addNewCountable(name); setName(''); }}
      style={CommonStyles.addButton}
       >
        <Text style={CommonStyles.addButtonText}>Add</Text>
       </TouchableOpacity>
    </View>
  );
};

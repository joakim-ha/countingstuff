// CountableRow.js
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, onNamePress }) => {
  const handleIncrement = () => {
    changeCount(1);
  };

  const handleDecrement = () => {
    changeCount(-1);
  };

  return (
    <View style={CommonStyles.row}>
      <TouchableOpacity onPress={() => onNamePress(countable.name)}>
        <View style={styles.nameColumn}>
          <Text style={CommonStyles.textItem}>{countable.name}</Text>
          <Text style={CommonStyles.textItem}>{countable.count}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonColumn}>
        <CountableButton label="+" submit={handleIncrement} />
        {countable.count > 0 && (
          <CountableButton label="-" submit={handleDecrement} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
});

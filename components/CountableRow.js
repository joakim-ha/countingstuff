import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, removeRow }) => (
  <View style={CommonStyles.row}>
    <View style={styles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View style={styles.buttonColumn}>
      <CountableButton
        label="+"
        submit={() => {
          changeCount(1);
        }}
      />
      <CountableButton
        label="-"
        submit={() => {
          changeCount(-1);
        }}
        disabled={countable.count === 0} // Disable minus button when count is zero
      />
      <CountableButton
        label="x" // Add a remove button
        submit={removeRow} // Trigger the removeRow function when the button is pressed
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
});
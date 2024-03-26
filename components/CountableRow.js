import React from 'react';
import { Text, View, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount }) => {
  const handleIncrement = () => {
    changeCount(1);
  };

  const handleDecrement = () => {
    changeCount(-1);
  };

  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        <Text style={CommonStyles.textItem}>{countable.name}</Text>
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <CountableButton label="+" submit={handleIncrement} />
        {/*Only display the decrement option if the counter is 0 or above */}
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

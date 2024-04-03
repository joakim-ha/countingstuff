import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { Countable } from "../interfaces/Countable";
import { CommonStyles } from "../styles/commonStyles";

export interface CountableRowProps {
  countable: Countable;
  index: number;
  changeCount: (value: number, index: number) => void;
}

// React.FC or explicitly return JSX.Element?
export const CountableRow: React.FC<CountableRowProps> = ({
  countable,
  index,
  changeCount,
}) => {
  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        <Text style={CommonStyles.textItem}>{countable.name}</Text>
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <CountableButton
          label="+"
          submit={() => {
            changeCount(1, index);
          }}
        />
        <CountableButton
          label="-"
          active={countable.count !== 0}
          submit={() => {
            changeCount(-1, index);
          }}
        />
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

import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CountableContext } from "../providers/CountableProvider";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, index }) => {
  const countableContext = useContext(CountableContext);
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
            countableContext.changeCount(1, index);
          }}
        />
        <CountableButton
          label="-"
          submit={() => {
            countableContext.changeCount(-1, index);
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

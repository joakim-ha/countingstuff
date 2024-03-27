import { Text, View, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index }) => (
  <View style={styles.countableRowContainer}>
    <View style={styles.name}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
    </View>
    <View style={styles.counter}>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View>
      <CountableButton
        label="+"
        submit={() => {
          changeCount(1, index);
        }}
      />
      <CountableButton
        label="-"
        submit={() => {
          changeCount(-1, index);
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  countableRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightblue",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    paddingStart: 20,
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 200,
  },
  counter: {
    flex: 1,
    alignItems: "flex-end",
    padding: 20,
  },
});

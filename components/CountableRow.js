import { Text, View, StyleSheet } from "react-native";

import { CountableButton, RemoveButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({
  countable,
  changeCount,
  index,
  removeCountable,
}) => (
  <View style={CommonStyles.row}>
    <View style={styles.deleteColumn}>
      <RemoveButton
        label="Delete"
        submit={() => {
          removeCountable(index);
        }}
      />
    </View>
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
        submit={() => {
          changeCount(-1, index);
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.5,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
  deleteColumn: {
    flex: 0.3,
  },
});

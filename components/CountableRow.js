import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index, onDelete }) => {
  /*
  console.log(`Count for ${countable.name}:`, countable.count);
  console.log(
    `Is '-' button disabled for ${countable.name}?`,
    countable.count < 1
  );
  */
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
          submit={() => {
            changeCount(-1, index);
          }}
          disabled={countable.count < 1}
        />
        <TouchableOpacity onPress={() => onDelete()}>
          <Text>Delete</Text>
        </TouchableOpacity>
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

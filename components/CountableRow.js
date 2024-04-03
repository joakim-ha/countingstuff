import { Text, View, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CloseButton } from "./CloseButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index, remove }) => (
  <View style={CommonStyles.row}>
    <View>
      <CloseButton 
        submit={() => {
          remove(countable.key);
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
        disable={countable.count > 0 ? false : true} 
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

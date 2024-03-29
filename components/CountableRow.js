import { Text, View, StyleSheet } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({
  countable,
  changeCount,
  index,
  deleteCountable,
}) => (
  <View style={CommonStyles.row}>
    <View style={styles.buttonColumn}>
      <CountableButton
        submit={() => {
          deleteCountable(index);
        }}
        imageSource={require("C:/Users/itlab/Desktop/mobilaAplcationer/uppgift1/countingstuff/images/delete.png")}
      />
      <CountableButton
        submit={() => {}}
        imageSource={require("C:/Users/itlab/Desktop/mobilaAplcationer/uppgift1/countingstuff/images/edit.png")}
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
      {countable.count > 0 && (
        <CountableButton
          label="-"
          submit={() => {
            changeCount(-1, index);
          }}
        />
      )}
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

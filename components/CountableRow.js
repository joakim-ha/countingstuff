import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({
  setCountables,
  countables,
  countable,
  changeCount,
  index,
}) => {
  const handleDelete = () => {
    const updatedCountables = [...countables];
    updatedCountables.splice(index, 1);
    setCountables(updatedCountables);
  };

  const handleEdit = () => {
    console.log("Item edited");
  };

  const renderLeftActions = () => {
    return (
      <View style={styles.leftActionsContainer}>
        <TouchableOpacity
          style={[styles.leftActionButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.leftActionButton]}
          onPress={handleEdit}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderLeftActions={renderLeftActions}>
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
      </Swipeable>
    </GestureHandlerRootView>
  );
};

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
  leftActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftActionButton: {
    margin: 10,
    padding: 20,
    width: 90,
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "lightblue",
  },
});

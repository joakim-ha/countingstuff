import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";
import ValidationService from "../utils/validation";

export const CountableRow = ({
  setCountables,
  countables,
  countable,
  changeCount,
  index,
}) => {
  const swipeableRef = useRef(null);
  const inputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(countable.name);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleDelete = () => {
    const updatedCountables = [...countables];
    updatedCountables.splice(index, 1);
    setCountables(updatedCountables);
  };

  const handleEdit = () => {
    setEditMode(true);
    console.log("Item edited");
    swipeableRef.current.close(); // Close the Swipeable
  };

  const handleSaveEdit = () => {
    if (!ValidationService.addRowValidation(editedName, countables, index)) {
      inputRef.current.focus();
      return;
    }

    const updatedCountables = [...countables];
    updatedCountables[index].name = editedName;
    setCountables(updatedCountables);
    setEditMode(false);
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
      <Swipeable ref={swipeableRef} renderLeftActions={renderLeftActions}>
        <View style={styles.countableRowContainer}>
          {editMode ? (
            <TextInput
              ref={inputRef}
              style={CommonStyles.textInput}
              value={editedName}
              onChangeText={setEditedName}
              onBlur={handleSaveEdit}
            />
          ) : (
            <View style={styles.name}>
              <Text style={CommonStyles.textItem}>{countable.name}</Text>
            </View>
          )}
          <View style={styles.counter}>
            <Text style={CommonStyles.textItem}>{countable.count}</Text>
          </View>
          <View>
            <>
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
            </>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  countableRowContainer: {
    backgroundColor: "white",
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

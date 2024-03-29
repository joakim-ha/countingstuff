import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Alert,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { SortingRow } from "./components/StortingRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCountables(countables);
    }
  }, [countables, isLoaded]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  const deleteCountable = (index) => {
    const newState = [...countables];
    newState.splice(index, 1);
    setCountables(newState);
  };

  const editCountable = (index) => {
    setEditingIndex(index);
    setEditedName(countables[index].name);
  };

  const saveEditedName = () => {
    if (editingIndex !== null && editedName.trim() !== "") {
      const isNameUnique = countables.every(
        (item, index) => index === editingIndex || item.name !== editedName,
      );

      if (isNameUnique) {
        const updatedCountables = [...countables];
        updatedCountables[editingIndex].name = editedName;
        setCountables(updatedCountables);
        setEditingIndex(null);
        setEditedName("");
      } else {
        Alert.alert(
          "Invalid Name",
          `The coutable "${editedName}" already exists. Please choose a unique name.`,
          [{ text: "OK" }],
        );
      }
    } else {
      Alert.alert("Invalid Name", "Please enter a valid name.", [
        { text: "OK" },
      ]);
    }
  };

  const addNewCountable = (name) => {
    const existing = countables.find((item) => item.name === name);
    if (!existing) {
      const newState = [...countables, { name, count: 0 }];
      setCountables(newState);
    } else {
      Alert.alert(
        "Item Already Exists",
        `The countable "${name}" already exists.`,
        [{ text: "OK" }],
      );
    }
  };

  const sortAlpha = () => {
    const sortedCountables = [...countables].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    setCountables(sortedCountables);
  };

  const sortCount = () => {
    const sortedCountables = [...countables].sort((a, b) => b.count - a.count);
    setCountables(sortedCountables);
  };

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <SortingRow sortAlpha={sortAlpha} sortCount={sortCount} />

          <ScrollView>
            {countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                index={index}
                deleteCountable={deleteCountable}
                editCountable={editCountable}
              />
            ))}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
      <Modal
        visible={editingIndex !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setEditingIndex(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Enter new name"
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={saveEditedName} />
              <Button title="Cancel" onPress={() => setEditingIndex(null)} />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%", // Adjust the width of the modal content
    maxHeight: "80%", // Limit the maximum height of the modal content
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

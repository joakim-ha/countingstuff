import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Text,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //AsyncStorage.clear();
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

    if (newState[index].count <= 0) {
      newState[index].count = 0;
    }

    setCountables(newState);
    sortCountablesByCount();
  };

  const addNewCountable = (name) => {
    if (name === "") {
      console.warn("Item name cannot be empty.");
      return;
    }

    if (countables.some((countable) => countable.name === name)) {
      console.warn("Item already exists.");
      return;
    }

    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
  };

  const sortCountablesByCount = () => {
    if (countables.length > 0) {
      const sortedCountables = [...countables].sort(
        (a, b) => b.count - a.count
      );
      setCountables(sortedCountables);
    }
  };

  /*   const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: "100%",
        }}
        onPress={() => {
          // Implement your delete action here
          console.log("Item deleted");
        }}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    );
  }; */

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {countables.length === 0 ? (
              <Text style={styles.noCountablesText}>
                Chirp chirp... no birds here. Get out of your house and start
                looking!
              </Text>
            ) : (
              countables.map((countable, index) => (
                <CountableRow
                  countables={countables}
                  setCountables={setCountables}
                  countable={countable}
                  key={countable.name}
                  changeCount={changeCount}
                  index={index}
                />
              ))
            )}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  noCountablesText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 40,
    padding: 30,
  },
});

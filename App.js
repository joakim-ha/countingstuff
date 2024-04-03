import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const addNewCountable = (name) => {
    // always dismiss keyboard
    Keyboard.dismiss();
    const trimmedName = name.trim();
    //check if not empty
    if (!trimmedName) {
      alert("the name cannot be empty. Please enter a name for the counter.");
      return;
    }

    // check for duplicates
    if (
      trimmedName &&
      !countables.some(
        (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      const newState = [...countables, { name: trimmedName, count: 0 }];
      setCountables(newState);
    } else {
      alert("Please enter a unique name for the item.");
      return;
    }
  };

const deleteCountable = (nameToRemove) => {
  setCountables(countables => 
    countables.filter(countable => countable.name !== nameToRemove)
  );
}

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                index={index}
                onDelete={()=> deleteCountable(countable.name)}
              />
            ))}
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
});

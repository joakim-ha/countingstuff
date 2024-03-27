import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow, RemoveRows } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  // https://javascript.info/currying-partials
  function curry(f) {
    // curry(f) does the currying transform
    return function (a) {
      return function (b) {
        return f(a, b);
      };
    };
  }

  const changeCount = (index, amount) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  const checkNamePresent = (name) => {
    return countables.some((item) => item.name === name);
  }

  const addNewCountable = (name) => {
    console.log("Trying to add the following countable:'", name, "'");

    //The name should not already be present, and cannot be empty/blank
    if (!checkNamePresent(name) && name.trim() !== ""){
      const newState = [...countables, { name, count: 0 }];
      console.log("Adding countable:'", name, "'");
      setCountables(newState);
      setErrorMessage("");
    }
    // Name cannot be blank/empty
    else if (name.trim() === ""){
      setErrorMessage("Must provide a name!");
      console.log("Empty name: '", name, "'");
    } else {
      setErrorMessage("Name already exists");
      console.log("Name present in countables array '", name, "'");
    }
  
  };

  const removeAllCountables = () => {
    setCountables([]);
  };

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
                changeCount={curry(changeCount)(index)}
              />
            ))}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow
            addNewCountable={addNewCountable}
            errorMessage={errorMessage}
          />
          <RemoveRows removeAllCountables={removeAllCountables} />
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

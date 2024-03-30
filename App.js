import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { RemoveRows } from "./components/RemoveRows";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editableName, setEditableName] = useState("");

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

  function curry(f) {
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

  const addNewCountable = (name) => {
    if (!checkNamePresent(name) && name.trim() !== "") {
      const newState = [...countables, { name, count: 0 }];
      setCountables(newState);
      setErrorMessage("");
    } else if (name.trim() === "") {
      setErrorMessage("Must provide a name!");
    } else {
      setErrorMessage("Name already exists");
    }
  };

  const editName = (name) => {
    setEditableName(name);
  };

  const removeAllCountables = () => {
    setCountables([]);
  };

  const checkNamePresent = (name) => {
    return countables.some((item) => item.name === name);
  };

  const editCountable = (name) => {
    console.log("implement editable:'", name,"'");
  };

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
                onNamePress={() => editName(countable.name)}
              />
            ))}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow
            addNewCountable={addNewCountable}
            editCountable={editCountable}
            errorMessage={errorMessage}
            initialValue={editableName}
          />
          <RemoveRows removeAllCountables={removeAllCountables} />
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

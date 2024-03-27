import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Keyboard,
  Text,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [key, setKey] = useState(0);

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
    const newState = [...countables, { key: key, name: name, count: 0 }];
    setKey(key + 1);
    setCountables(newState);
    Keyboard.dismiss();   // Using the imported 'Keyboard' component to hide the keyboard
  };

  function sortCountables(countable_a, countable_b) {
    return countable_a.count > countable_b.count ? -1 : (countable_a.count < countable_b.count ? 1 : 0);
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
            {countables.length > 0 ?
              countables
              .sort(sortCountables)       // Calls sortCountables() with current and previous countable
              .map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.key}
                changeCount={changeCount}
                index={index}
              />
            )) 
            :
              <View style={styles.alternate_view}>
                <Text>Enter a name and press 'Add' to add a countable!</Text>
              </View>}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
          <StatusBar style="auto" />
          <FlashMessage position="top" />
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
  alternate_view: {
    alignItems: "center",
    marginTop: 50,
  },
});

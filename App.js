import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
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
import ValidationService from "./utils/validation";

export default function App() {
  const scrollViewRef = useRef(null);

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

  const addNewCountable = (name, index) => {
    if (!ValidationService.addRowValidation(name, countables, index)) {
      return;
    }
    scrollViewRef.current.scrollToEnd({ animated: true });

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

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView ref={scrollViewRef}>
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

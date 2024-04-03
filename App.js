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

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
//import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const checkCount = newState[index].count + amount;

    if(checkCount >= 0){
      newState[index].count = checkCount;
      setCountables(newState);
    }
  };

  const addNewCountable = (name) => {
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
  };

  const deleteCountable = (index) => {
    const newState = countables.filter((item, idx) => idx !== index);
    setCountables(newState);
  };

  const checkDuplicates = (name)=>{
    const list= [...countables];

    const result= list.find(countable => countable.name===name);

    return !!result;
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
          {countables
           .sort((a, b) => a.count - b.count) //
          .map((countable, index) => (
          <CountableRow
          countable={countable}
           key={countable.name}
             changeCount={changeCount}
            index={index}
            deleteCountable={deleteCountable}
          />
        ))}
            <View style={{ flex: 1 }} />
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} checkDuplicates={checkDuplicates} />
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

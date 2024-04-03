import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Image,
} from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { Countable } from "./interfaces/Countable";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
//import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [countables, setCountables] = useState<Countable[]>([]);
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

  const changeCount = (amount: number, index: number) => {
    const newState = [...countables];
    if (newState[index].count + amount >= 0) {
      newState[index].count += amount;
      sortCountables(newState);
      setCountables(newState);
    }
  };

  const addNewCountable = (name: string) => {
    const unique: boolean = !countables.some(
      (countable) => countable.name === name,
    );

    if (unique && name) {
      const newState = [...countables, { name, count: 0 }];
      setCountables(newState);
    }
  };

  const sortCountables = (countables: Countable[]) => {
    return countables.sort((a, b) => b.count - a.count);
  };

  const removeCountable = (index: number) => {
    setCountables((prevCountables) => {
      const updatedCountables = [...prevCountables];
      updatedCountables.splice(index, 1);
      return updatedCountables;
    });
  };

  const longPress = (index: number) => {
    return Gesture.LongPress().onEnd(() => {
      console.log("Longpress index", index);
      removeCountable(index);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {countables.length === 0 ? (
            <Image source={require("./img/domherre.jpg")} />
          ) : (
            <ScrollView>
              {countables.map((countable, index) => (
                <GestureHandlerRootView key={index}>
                  <GestureDetector gesture={longPress(index)}>
                    <CountableRow
                      countable={countable}
                      key={countable.name}
                      changeCount={changeCount}
                      index={index}
                    />
                  </GestureDetector>
                </GestureHandlerRootView>
              ))}
              <View style={{ flex: 1 }} />
            </ScrollView>
          )}
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

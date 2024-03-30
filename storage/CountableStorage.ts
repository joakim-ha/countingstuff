import AsyncStorage from "@react-native-async-storage/async-storage";

import { Countable } from "../interfaces/Countable";

export const saveCountables = async (countables: Countable[]) => {
  await AsyncStorage.setItem("countables", JSON.stringify(countables));
};

export const loadCountables = async () => {
  const result = await AsyncStorage.getItem("countables");
  return result ? JSON.parse(result) : [];
};

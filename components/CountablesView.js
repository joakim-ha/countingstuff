import { useContext } from "react";
import { KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";

import { AddRow } from "./AddRow";
import { CountableRow } from "./CountableRow";
import { CountableContext } from "../providers/CountableProvider";

export const CountablesView = () => {
  const countableContext = useContext(CountableContext);

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        {countableContext.countables.map((countable, index) => (
          <CountableRow
            countable={countable}
            key={countable.name}
            index={index}
          />
        ))}
        <View style={{ flex: 1 }} />
      </ScrollView>
      <AddRow />
    </KeyboardAvoidingView>
  );
};

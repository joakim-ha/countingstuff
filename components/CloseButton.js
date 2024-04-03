import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const CloseButton = ({submit}) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={styles.textItem}>X</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flex: 2,
    paddingTop: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  textItem: {
    fontSize: 30,
    color: "red",
  },
});

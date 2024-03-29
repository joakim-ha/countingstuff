import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import { CommonStyles } from "../styles/CommonStyles";

export const CountableButton = ({ label, submit, imageSource }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    {imageSource ? (
      <Image source={imageSource} style={styles.image} />
    ) : (
      <Text style={CommonStyles.textItem}>{label}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  image: {
    width: 40, // Adjust the width and height as needed
    height: 40,
  },
});

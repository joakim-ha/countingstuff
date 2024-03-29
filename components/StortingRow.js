import { View } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const SortingRow = ({ sortAlpha, sortCount }) => (
  <View alignItems="center">
    <View style={CommonStyles.row}>
      <CountableButton
        submit={() => {
          sortAlpha();
        }}
        imageSource={require("C:/Users/itlab/Desktop/mobilaAplcationer/uppgift1/countingstuff/images/alpha.png")}
      />
      <CountableButton
        submit={() => {
          sortCount();
        }}
        imageSource={require("C:/Users/itlab/Desktop/mobilaAplcationer/uppgift1/countingstuff/images/num.png")}
      />
    </View>
  </View>
);

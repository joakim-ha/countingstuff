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
        imageSource={require("../images/alpha.png")}
      />
      <CountableButton
        submit={() => {
          sortCount();
        }}
        imageSource={require("../images/num.png")}
      />
    </View>
  </View>
);

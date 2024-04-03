import { View } from "react-native";

import { CountableButton } from "./CountableButton";
import { DeleteStyles } from "../styles/CommonStyles";

export const RemoveRows = ({ removeAllCountables }) => {
  const handleDelete = () => {
    removeAllCountables();
  };

  return (
    <View style={DeleteStyles.row}>
      <CountableButton
        label="Remove all"
        submit={handleDelete}
        style={DeleteStyles.button}
      />
    </View>
  );
};

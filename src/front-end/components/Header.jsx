import React from "react";
import { View } from "react-native";
import tw from "twrnc";

export default function Title(props) {
  return (
    <View style={tw`flex-row justify-between w-full px-8 py-4`}>
      {props.children}
    </View>
  );
}

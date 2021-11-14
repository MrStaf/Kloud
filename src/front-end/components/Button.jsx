import React from "react";
import { Pressable, View, Text } from "react-native";
import tw from "twrnc";

export default function Button(props) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={tw`bg-[#60AEC2] py-4 px-10 mb-10 rounded-xl`}>
        <Text style={tw`text-[#fff]`}>{props.title}</Text>
      </View>
    </Pressable>
  );
}

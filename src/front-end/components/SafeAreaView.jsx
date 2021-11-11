import React from "react";
import { SafeAreaView } from "react-native";
import tw from "twrnc";

export default function SafeArea(props) {
  return (
    <SafeAreaView
      style={tw`flex-1 justify-between w-full bg-[#F3F0E6] dark:bg-[#252525] pt-8`}
    >
      {props.children}
    </SafeAreaView>
  );
}

// React Native
import React, { useEffect, useState } from "react";
import { View, Button, Text, Image, TouchableOpacity } from "react-native";
// Styles
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import { vw } from "react-native-expo-viewport-units";
// Icons
import { dots, goBack } from "../assets/icons";

// Test Image
const test = require("../assets/image-2.jpg");

export default function ModalPhoto({ navigation }) {
  const id = navigation.getState().routes[1].params.id;
  return (
    <View
      style={[
        tw`justify-between h-full`,
        { backgroundColor: "#222222" },
      ]}
    >
      <View style={tw`flex-row items-center justify-between`}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <SvgXml width={40} height={40} xml={goBack} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <SvgXml width={40} height={30} xml={dots} />
        </TouchableOpacity>
      </View>
      <Image
        source={test}
        style={{ width: vw(100), height: vw(100), resizeMode: "contain" }}
      />
    </View>
  );
}

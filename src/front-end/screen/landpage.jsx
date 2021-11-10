import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";

// Images
import heroHeader from "./../assets/hero-header.png";
import logo from "./../assets/logo.png";

// Components
import ButtonsLandPage from "./../components/buttonsLandPage";

export default function landPage({ navigation }) {
  return (
    <View
      style={tw`flex-1 items-center justify-between px-8 py-16 bg-[#F3F0E6] dark:bg-[#252525]`}
    >
      <StatusBar style="auto" />
      <View style={tw`mt-12`}>
        <Image
          source={logo}
          style={{ width: 400, height: 65, resizeMode: "contain" }}
        />
        <View style={tw`w-full h-12`}></View>
        <Image
          source={heroHeader}
          style={{ width: 400, height: 200, resizeMode: "contain" }}
        />
      </View>
      <View style={tw`mb-16`}>
        <Text style={tw`font-bold text-center text-4xl pb-6 text-[#60AEC2]`}>
          Secure your photos.
        </Text>
        <Text style={tw`text-[#60AEC2] text-center text-lg`}>
          Keep your photos online, and encrypted. One account and have access to
          your photos from anywhere in the world.
        </Text>
      </View>
      <ButtonsLandPage navigation={navigation}/>
    </View>
  );
}

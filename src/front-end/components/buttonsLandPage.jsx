import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import tw from "twrnc";

export default function ButtonsLandPage({ navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate("SignIn")}
    >
      <View
        style={tw`flex flex-row bg-[#ABCDCB] pr-10 items-center rounded-xl`}
      >
        <Pressable
          onPress={() => navigation.navigate("Register")}
        >
          <View
            style={tw`bg-[#60AEC2] py-4 px-10 mr-10 rounded-xl text-[#ffffff]`}
          >
            <Text style={tw`text-[#000]`}>Register</Text>
          </View>
        </Pressable>
        <Text style={tw`text-[#000]`}>Sign In</Text>
      </View>
    </Pressable>
  );
}

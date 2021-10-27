import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import tw from "twrnc";

export default function ButtonsLandPage({ navigation }) {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate("SignIn")}
      underlayColor="white"
    >
      <View
        style={tw`flex flex-row bg-[#ABCDCB] pr-10 items-center rounded-xl`}
      >
        <TouchableHighlight
          onPress={() => navigation.navigate("Register")}
          underlayColor="white"
        >
          <View
            style={tw`bg-[#60AEC2] py-4 px-10 mr-10 rounded-xl text-[#ffffff]`}
          >
            <Text style={tw`text-[#ffffff]`}>Register</Text>
          </View>
        </TouchableHighlight>
        <Text style={tw`text-[#ffffff]`}>Sign In</Text>
      </View>
    </TouchableHighlight>
  );
}

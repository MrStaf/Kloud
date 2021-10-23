import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";

// Images
import logo from "./../assets/logo.png";

// Components
import Field from "./../components/Field";

export default function Register({ navigation }) {
  return (
    <View
      style={tw`flex-1 items-center justify-between px-8 py-16 bg-[#F3F0E6] dark:bg-[#252525]`}
    >
      <StatusBar style="auto" />
      <View style={tw`mt-0`}>
        <Image
          source={logo}
          style={{ width: 400, height: 65, resizeMode: "contain" }}
        />
        <Text style={tw`font-bold text-3xl text-[#60AEC2] mx-8 mt-4`}>
          Let's sign you in.
        </Text>
        <Text style={tw`text-[#60AEC2] text-2xl mx-8`}>
          Welcome back. You’ve been missed!
        </Text>
      </View>
      <View>
        <Field title="Email" />
        <Field title="Password" type="password" />
      </View>
      <View>
        <View style={tw`flex-row justify-center flex-1 w-64`}>
          <Text style={tw`text-[#777777]`}>Don't have an account ? </Text>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={tw`text-[#60AEC2] font-bold`}>Register</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight>
          <View
            style={tw`w-full py-4 bg-[#60AEC2] flex items-center justify-center rounded-xl mt-2`}
          >
            <Text style={tw`text-[#fff]`}>Sign In</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

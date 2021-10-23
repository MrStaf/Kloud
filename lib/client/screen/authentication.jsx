import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";

// Images
import logo from "./../assets/logo.png";

// Components

export default function Authentication({ navigation }) {
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
          Authentication required
        </Text>
      </View>
      <View style={tw`justify-center flex-1`}>
        <View style={tw`flex-row justify-between`}>
          <View
            style={tw`mx-4 w-4 h-4 bg-[#fff] rounded-full border border-[#60AEC2]`}
          ></View>
          <View
            style={tw`mx-4 w-4 h-4 bg-[#fff] rounded-full border border-[#60AEC2]`}
          ></View>
          <View
            style={tw`mx-4 w-4 h-4 bg-[#fff] rounded-full border border-[#60AEC2]`}
          ></View>
          <View
            style={tw`mx-4 w-4 h-4 bg-[#fff] rounded-full border border-[#60AEC2]`}
          ></View>
        </View>
        <View style={tw`flex-row flex-wrap justify-center mt-8`}>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
          <View
            style={tw`h-16 w-16 mx-2 my-2 bg-[#fff] rounded-full border border-[#60AEC2] flex justify-center items-center`}
          >
            1
          </View>
        </View>
      </View>
      <View>
        <View style={tw`flex-row justify-center flex-1 w-64`}>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={tw`text-[#60AEC2] font-bold`}>Forgot ?</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight>
          <View
            style={tw`w-full py-4 bg-[#60AEC2] flex items-center justify-center rounded-xl mt-2`}
          >
            <Text style={tw`text-[#fff]`}>Log In</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

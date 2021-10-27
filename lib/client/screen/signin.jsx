import React, { useState } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

// Images
import logo from "./../assets/logo.png";

// Components
import Field from "./../components/Field";

const handleSignIn = async ({email, password}) => {

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  };

  let reqOptions = {
    url: "http://localhost:3000/api/user/signin",
    method: "POST",
    headers: headersList,
    data: `{\n    "email": ${email},\n    "password": ${password}\n}`,
  };

  axios.request(reqOptions).then(function (response) {
    console.log(response.data);
    alert("logged");
  });
};

export default function signIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <Field title="Email" value={email} setValue={setEmail} />
        <Field
          title="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <View>
        <View style={tw`flex-row justify-center w-64`}>
          <Text style={tw`text-[#777777]`}>Don't have an account ? </Text>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={tw`text-[#60AEC2] font-bold`}>Register</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={() => {handleSignIn(email, password)}}>
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

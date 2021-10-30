import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";

// Images
import logo from "./../assets/logo.png";

// Components
import Field from "./../components/Field";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const handleSignIn = async (email, password, navigation) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  fetch("https://kloud.benoit.fage.fr/api/user/signin", {
    method: "POST",
    body: `{\n   \"email\": \"${email}\",\n  \"password\": \"${password}\"\n}`,
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const res = JSON.stringify({
        token: data.token,
        email: data.data[0].email,
        firstName: data.data[0].firstName,
        lastName: data.data[0].lastName
      });
      save("user_", res);
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.error(err);
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
        <TouchableHighlight
          onPress={() => {
            handleSignIn(email, password, navigation);
          }}
        >
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

import React, { useState, useEffect } from "react";
import { Text, View, Image, Pressable, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import save from "./../functions/save";

// Images
import logo from "./../assets/logo.png";

// Components
import Field from "./../components/Field";

// SVG
import {mail, lock} from "./../assets/icons";
import Toast from "react-native-toast-message";

const handleSignIn = async (email, password, navigation, setLogged) => {
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
      if (data.status === "FAILED") {
        Toast.show({
          type: "error",
          text1: data.message
        })
      } else {
        console.log(data)
        Toast.show({
          type: "success",
          text1: data.message
        })
        const res = JSON.stringify({
          token: data.token,
          email: data.data[0].email,
          firstName: data.data[0].firstName,
          lastName: data.data[0].lastName,
        });
        save("user_", res);
        setLogged(true);
        navigation.navigate("Authentication");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function signIn({ navigation, logged, setLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={tw`flex-1 items-center justify-between px-8 py-16 bg-[#F3F0E6] dark:bg-[#252525]`}>
      <StatusBar style="auto" />
      <View style={tw`mt-0`}>
        <Image source={logo} style={{ width: 400, height: 65, resizeMode: "contain" }} />
        <Text style={tw`font-bold text-3xl text-[#60AEC2] mx-8 mt-4`}>Let's sign you in.</Text>
        <Text style={tw`text-[#60AEC2] text-2xl mx-8`}>Welcome back. You’ve been missed!</Text>
      </View>
      <View>
        <Field icon={mail} title="Email" autoComplete="email" value={email} setValue={setEmail} />
        <Field icon={lock} title="Password" autoComplete="current-password" type="password" value={password} setValue={setPassword} />
      </View>
      <View>
        <View style={tw`flex-row justify-center w-64`}>
          <Text style={tw`text-[#777777]`}>Don't have an account ? </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}>
            <Text style={tw`text-[#60AEC2] font-bold`}>Register</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            handleSignIn(email, password, navigation, setLogged);
          }}>
          <View style={tw`w-full py-4 bg-[#60AEC2] flex items-center justify-center rounded-xl mt-2`}>
            <Text style={tw`text-[#fff]`}>Sign In</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

// Images
import logo from "./../assets/logo.png";

// Components
import Field from "./../components/Field";

// SVG
import { lock, user, mail } from "../assets/icons";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}



export default function Register({ navigation, logged, setLogged }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  ) => {
    if (confirmPassword !== password) {
      Toast.show({
        type: "error",
        text1: "Password",
        text2: "Passwords are different ",
      });
      return;
    }
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Empty value",
        text2: "Some fields are empty",
      });
    }
  
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
  
    const body = {
      firstName,
      lastName,
      email,
      password,
    };
  
    fetch("https://kloud.benoit.fage.fr/api/user/signup", {
      method: "POST",
      body: JSON.stringify(body),
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        if (data.status === "FAILED") {
          Toast.show({
            type: "error",
            text1: "Field",
            text2: data.message,
          });
        } else {
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
                lastName: data.data[0].lastName,
              });
              save("user_", res);
              setLogged(true);
              navigation.navigate("Authentication");
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        // console.error(err);
      });
  };
  
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
          Let's register you in.
        </Text>
        <Text style={tw`text-[#60AEC2] text-2xl mx-8`}>
          It's free, secure and available on all devices.
        </Text>
      </View>
      <View>
        <Field
          title="First Name"
          autoComplete="given-name"
          value={firstName}
          setValue={setFirstName}
          icon={user}
        />
        <Field
          title="Last Name"
          autoComplete="family-name"
          value={lastName}
          setValue={setLastName}
          icon={user}
        />
        <Field
          title="Email"
          autoComplete="email"
          value={email}
          setValue={setEmail}
          icon={mail}
        />
        <Field
          title="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          setValue={setPassword}
          icon={lock}
        />
        <Field
          title="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          icon={lock}
        />
      </View>
      <View>
        <View style={tw`flex-row justify-center w-64`}>
          <Text style={tw`text-[#777777]`}>Have an account ? </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={tw`text-[#60AEC2] font-bold`}>Login</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            handleRegister(
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
            );
          }}
        >
          <View
            style={tw`w-full py-4 bg-[#60AEC2] flex items-center justify-center rounded-xl mt-2`}
          >
            <Text style={tw`text-[#fff]`}>Register</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

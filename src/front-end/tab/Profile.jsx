import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useColorScheme, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import save from "./../functions/save";

// Local
import Title from "./../components/Title";
import Header from "./../components/Header";
import SafeAreaView from "./../components/SafeAreaView";
import Button from "./../components/Button";

// Functions
import fetchApi from "./../functions/fetchApi";

// Styles
import tw from "twrnc";

// Assets
import { logout, logout_white } from "./../assets/icons";

// SVG
import { SvgXml } from "react-native-svg";

const Line = (props) => {
  return (
    <View
      style={tw`flex-row items-center ${
        props.title ? "justify-between" : "justify-center"
      } w-full px-4 mb-2`}
    >
      {props.title && (
        <Text style={tw`text-[#000] dark:text-[#fff]`}>{props.title}</Text>
      )}
      {props.children}
    </View>
  );
};

export default function Profile({ navigation, setLogged }) {
  const [isLightMode, setIsLightMode] = useState(true);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");

  useEffect(() => {
    const setLightMode = async () => {
      const theme = await SecureStore.getItemAsync("theme_");
      if (theme === null) {
        setIsLightMode(useColorScheme() === "light");
      } else {
        setIsLightMode(theme === "light");
      }
    };
    const getUser = async () => {
      const user_ = await SecureStore.getItemAsync("user_");
      if (!user_) return;
      setUser(JSON.parse(user_));
    };
    setLightMode();
    getUser();
  }, []);

  const handleChange = async () => {
    const user_ = await SecureStore.getItemAsync("user_");
    const oldUser = JSON.parse(user_);
    let body;
    if (oldUser.firstName !== user.firstName) {
      body = {
        firstName: user.firstNeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkwZmVlYzFkNDg2YzA3NWE4ZGQ2ZDciLCJpYXQiOjE2MzY4OTIzOTZ9.K0rGQ6ItZjwuLldMrMp1-plLaqiXe2IxN2iCFZIX5tgame,
      };
    }
    if (oldUser.lastName !== user.lastName) {
      body = {
        ...body,
        lastName: user.lastName,
      };
    }
    if (oldUser.email !== user.email) {
      body = {
        ...body,
        email: user.email,
      };
    }
    if (body === undefined) {
      return;
    }
    const res = await fetchApi({
      endPoint : "user/",
      method: "PATCH",
      body: body,
      verify: true,
    })
    if (res.status === "SUCCESS") {
      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: res.message,
      });
      const data = JSON.stringify({
        token: res.token,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      });
      save("user_", data)
      return;
    }
    setUser(oldUser);
    Toast.show({
      type: "error",
      text1: "Profile not updated",
      text2: res.message,
    });
  };

  const handleChangePassword = async () => {
    const body = {
      password
    }
    const res = await fetchApi({
      endPoint : "user/",
      method: "PATCH",
      body: body,
      verify: true,
    })
    if (res.status === "SUCCESS") {
      Toast.show({
        type:"success",
        text1: "Password",
        text2: res.message
      })
      setPassword("");
    } else {
      Toast.show({
        type: "error",
        text1: "Password",
        text2: res.message
      })
    }
  };

  const toggleSwitch = () => {
    const oldLightMode = isLightMode;
    setIsLightMode(!oldLightMode);
    tw.setColorScheme(!oldLightMode ? "light" : "dark");
    SecureStore.setItemAsync("theme_", !oldLightMode ? "light" : "dark");
  };

  const handleLogOut = () => {
    setLogged(false);
    SecureStore.deleteItemAsync("user_");
    SecureStore.deleteItemAsync("pass_");
    navigation.navigate("LandPage");
  };
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Header>
        <Title text="Profile" />
        <Pressable onPress={handleLogOut}>
          <SvgXml
            style={tw`hidden dark:flex`}
            xml={logout_white}
            width={40}
            height={40}
          />
          <SvgXml
            style={tw`flex dark:hidden`}
            xml={logout}
            width={40}
            height={40}
          />
        </Pressable>
      </Header>
      <View style={tw`w-full h-full`}>
        <Line title="Change theme color">
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isLightMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isLightMode}
          />
        </Line>
        <Line title="First name">
          <TextInput
            style={tw`border rounded bg-[#fff] ml-4 px-2 flex-grow-1`}
            onChangeText={(text) => {
              const newUser = user;
              newUser.firstName = text;
              setUser(newUser);
            }}
            defaultValue={user?.firstName}
          />
        </Line>
        <Line title="Last name">
          <TextInput
            style={tw`border rounded bg-[#fff] ml-4 px-2 flex-grow-1`}
            onChangeText={(text) => {
              const newUser = user;
              newUser.lastName = text;
              setUser(newUser);
            }}
            defaultValue={user?.lastName}
          />
        </Line>
        <Line title="Email         ">
          <TextInput
            style={tw`border rounded bg-[#fff] ml-4 px-2 flex-grow-1`}
            onChangeText={(text) => {
              const newUser = user;
              newUser.email = text;
              setUser(newUser);
            }}
            defaultValue={user?.email}
          />
        </Line>
        <Line>
          <Button onPress={handleChange} title="Submit change" />
        </Line>
        <Line title="Password ">
          <TextInput
            style={tw`border rounded bg-[#fff] ml-4 px-2 flex-grow-1`}
            onChangeText={(text) => setPassword(text)}
            defaultValue={password}
          />
        </Line>
        <Line>
          <Button onPress={handleChangePassword} title="Change password" />
        </Line>
      </View>
    </SafeAreaView>
  );
}

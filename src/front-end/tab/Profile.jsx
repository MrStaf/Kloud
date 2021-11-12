import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native";

// Local
import Title from "./../components/Title";
import Header from "./../components/Header";
import SafeAreaView from "./../components/SafeAreaView";

// Styles
import tw from "twrnc";

// Assets
import { logout, logout_white } from "./../assets/icons";

// SVG
import { SvgXml } from "react-native-svg";

const Line = (props) => {
  return (
    <View style={tw`flex-row items-center justify-between w-full px-4`}>
      <Text style={tw`text-[#000] dark:text-[#fff]`}>{props.title}</Text>
      {props.children}
    </View>
  );
};

export default function Profile({ navigation, setLogged }) {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    const setIsLightMode = async () => {
      const theme = await SecureStore.getItemAsync("theme_");
      if (theme === null) {
        setIsLightMode(useColorScheme() === "light");
      } else {
        setIsLightMode(theme === "light");
      }
    };
  }, []);

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
      </View>
    </SafeAreaView>
  );
}

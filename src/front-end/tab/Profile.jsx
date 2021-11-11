import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";

// Local
import Title from "./../components/Title";
import Header from "./../components/Header";
import SafeAreaView from "./../components/SafeAreaView";

// Styles
import tw from "twrnc";

// Assets
import { logout } from "./../assets/icons";

// SVG
import { SvgXml } from "react-native-svg";

export default function Profile({ navigation, setLogged }) {
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
            style={{
              width: 40,
              height: 40,
            }}
            xml={logout}
            width={40}
            height={40}
          />
        </Pressable>
      </Header>
    </SafeAreaView>
  );
}

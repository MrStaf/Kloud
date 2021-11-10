import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, Text, Image, Pressable } from "react-native";

// Local

// Styles
import tw from "twrnc";

// Assets
import { logout } from "./../assets/icons";

// SVG
import { SvgXml } from "react-native-svg";

export default function Favorite({ navigation, setLogged }) {
  const handleLogOut = () => {
    setLogged(false);
    SecureStore.deleteItemAsync("user_");
    SecureStore.deleteItemAsync("pass_");
    navigation.navigate("LandPage");
  };
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-between bg-[#F3F0E6] dark:bg-[#252525] pt-8`}>
      <StatusBar style="auto" />
      <View style={tw`flex-row justify-between w-full px-8 py-4`}>
        <Text style={tw`text-4xl text-[#666666]`}>Profile</Text>
        <Pressable onPress={toggleTheme}>
          <SvgXml xml={logout} width={40} height={40} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

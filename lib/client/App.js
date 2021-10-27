import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";

// Style
import tw from "twrnc";

// Screen
import LandPage from "./screen/landpage";
import Register from "./screen/register";
import SignIn from "./screen/signin";
import Authentication from "./screen/authentication";
import ModalPhoto from "./screen/modalphoto";

// Tab
const Tab = createBottomTabNavigator();

import Photos from "./tab/Photos";
import Favorite from "./tab/Favorite";
import Profile from "./tab/Profile";
import Albums from "./tab/Albums";

// Icons
import {
  homeLogo,
  favoriteLogo,
  profileLogo,
  albumsLogo,
} from "./assets/icons";

import {
  homeLogo_2,
  favoriteLogo_2,
  profileLogo_2,
  albumsLogo_2,
} from "./assets/icons";

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Photos"
        component={Photos}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => {
            return (
              <SvgXml
                width={size}
                height={size}
                xml={focused ? homeLogo : homeLogo_2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => {
            return (
              <SvgXml
                width={size}
                height={size}
                xml={focused ? favoriteLogo : favoriteLogo_2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => {
            return (
              <SvgXml
                width={size}
                height={size}
                xml={focused ? profileLogo : profileLogo_2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Albums"
        component={Albums}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => {
            return (
              <SvgXml
                width={size}
                height={size}
                xml={focused ? albumsLogo : albumsLogo_2}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LandPage" component={LandPage} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ModalPhoto" component={ModalPhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

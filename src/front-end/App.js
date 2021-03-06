import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useColorScheme, View } from "react-native";

// Style
import tw from "twrnc";
import { SvgXml } from "react-native-svg";

// Screen
import LandPage from "./screen/landpage";
import Register from "./screen/register";
import SignIn from "./screen/signin";
import Authentication from "./screen/authentication";
import ModalPhoto from "./screen/modalPhoto";
import ModalUpload from "./screen/modalUpload";
import ModalCreateAlbum from "./screen/modalCreateAlbum";
import ModalViewAlbum from "./screen/modalViewAlbum";

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

const Home = ({ navigation, logged, setLogged }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Photos"
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
      >
        {(props) => <Photos {...props} logged={logged} setLogged={setLogged} />}
      </Tab.Screen>
      <Tab.Screen
        name="Favorite"
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
      >
        {(props) => (
          <Favorite {...props} logged={logged} setLogged={setLogged} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
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
      >
        {(props) => (
          <Profile {...props} logged={logged} setLogged={setLogged} />
        )}
      </Tab.Screen>
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
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const isLogged = async () => {
      const log = await SecureStore.getItemAsync("user_");
      setLogged(log !== null);
    };
    isLogged();
  }, [logged]);
  useEffect(() => {
    const isLogged = async () => {
      const theme = await SecureStore.getItemAsync("theme_");
      if (theme === null) {
        tw.setColorScheme(useColorScheme());
      } else {
        tw.setColorScheme(theme);
      }
    };
    isLogged();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="LandPage" component={LandPage} />
          <Stack.Screen name="SignIn">
            {(props) => (
              <SignIn {...props} logged={logged} setLogged={setLogged} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => (
              <Register {...props} logged={logged} setLogged={setLogged} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {(props) => (
              <Home {...props} logged={logged} setLogged={setLogged} />
            )}
          </Stack.Screen>
          <Stack.Screen name="ModalPhoto" component={ModalPhoto} />
          <Stack.Screen name="ModalUpload" component={ModalUpload} />
          <Stack.Screen name="ModalCreateAlbum" component={ModalCreateAlbum} />
          <Stack.Screen name="ModalViewAlbum" component={ModalViewAlbum} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

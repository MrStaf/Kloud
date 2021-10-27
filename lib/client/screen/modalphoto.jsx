// React Native
import React, { useEffect, useState } from "react";
import { View, Button, Text, Image, TouchableOpacity } from "react-native";
// Modules
// import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
// Styles
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import { vw, vh } from "react-native-expo-viewport-units";
import Constants from "expo-constants";
// Icons
import { dots, goBack, heart, heart_filled } from "../assets/icons";

// Test Image
const test = require("../assets/sansTitre.png");

export default function ModalPhoto({ navigation }) {
  const [fav, setFav] = useState(false);
  const id = navigation.getState().routes[1].params.id;
  return (
    <View
      style={[
        tw`relative h-full`,
        {
          backgroundColor: "#222222",
          paddingTop: Constants.statusBarHeight,
        },
      ]}
    >
      <View style={tw`z-10 flex-row items-center justify-between m-4`}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <SvgXml width={40} height={40} xml={goBack} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <SvgXml width={40} height={30} xml={dots} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          tw`justify-center flex-grow`,
          {
            marginBottom: Constants.statusBarHeight,
            maxHeight: vh(100) - Constants.statusBarHeight * 2,
          },
        ]}
      >
        {/* <ReactNativeZoomableView
          maxZoom={2}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
        > */}
          <Image
            source={test}
            style={{
              width: vw(100),
              maxHeight: vh(100),
              resizeMode: "contain",
            }}
          />
        {/* </ReactNativeZoomableView> */}
      </View>
      <View
        style={[
          tw`absolute bottom-0 z-10 items-center w-full`,
          {
            padding: Constants.statusBarHeight,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setFav(!fav);
          }}
        >
          <SvgXml width={40} height={30} xml={fav ? heart_filled : heart} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

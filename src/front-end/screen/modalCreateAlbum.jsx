import React, { useState } from "react";
import { View, Pressable } from "react-native";
import Toast from "react-native-toast-message";

// Style
import tw from "twrnc";
import Constants from "expo-constants";

// Components
import Field from "./../components/Field";
import Header from "./../components/Header";
import Title from "./../components/Title";
import Button from "./../components/Button";

// SVG
import { name, goBack } from "./../assets/icons";
import { SvgXml } from "react-native-svg";

// Functions
import fetchApi from "./../functions/fetchApi";

export default function modalCreateAlbum({ navigation }) {
  const [nameValue, setNameValue] = useState("");

  const handleCreateAlbum = async () => {
    const response = await fetchApi({
      endPoint: `album/`,
      method: "POST",
      body: {
        name: nameValue,
      },
      verify: true,
    });
    console.log(response);
    if (response.status === "SUCCESS") {
      Toast.show({
        type: "success",
        text1: response.message,
      });
      navigation.goBack();
      return;
    }
    Toast.show({
      type: "error",
      text1: response.message,
    });
  };

  return (
    <View
      style={[
        tw`relative h-full bg-[#F3F0E6] dark:bg-[#252525]`,
        {
          paddingTop: Constants.statusBarHeight,
        },
      ]}
    >
      <View style={tw`flex-col items-center justify-between m-4`}>
        <Header>
          <Pressable onPress={() => navigation.goBack()}>
            <SvgXml width={40} height={40} xml={goBack} />
          </Pressable>
          <Title text="Create Album" />
        </Header>

        <Field
          icon={name}
          title="Name"
          value={nameValue}
          setValue={setNameValue}
        />
        <Button title="Submit" onPress={handleCreateAlbum} />
      </View>
    </View>
  );
}

// React Native
import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";

// Local
import Button from "../components/Button";

// Modules
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";

// Styles
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import { vw, vh } from "react-native-expo-viewport-units";
import Constants from "expo-constants";

// Icons
import { dots, goBack } from "../assets/icons";

const createFormData = (photo, body = {}) => {
  const data = new FormData();
  data.append("file", {
    name:
      photo.fileName ||
      photo.uri.split("/")[photo.uri.split("/").length - 1].split(".")[0],
    type:
      photo.type +
      "/" +
      photo.uri.split("/")[photo.uri.split("/").length - 1].split(".")[1],
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

export default function ModalUpload({ navigation }) {
  // const id = navigation.getState().routes[1].params.id;
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  const handleUploadPhoto = async () => {
    SecureStore.getItemAsync("user_")
      .then((user) => {
        let userParsed = JSON.parse(user);
        let headersList = {
          Accept: "*/*",
          "auth-token": userParsed.token,
        };
        fetch(`https://kloud.benoit.fage.fr/api/photos/upload`, {
          method: "POST",
          body: createFormData(photo, { description: "" }),
          headers: headersList,
        })
          .then((response) => response.json())
          .then((response) => {
            navigation.navigate({
              name: "Photos",
              params: { refresh: true },
              merge: true,
            });
            console.log("response", response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
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
      <View style={tw`z-10 flex-row items-center justify-between m-4`}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml width={40} height={40} xml={goBack} />
        </Pressable>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml width={40} height={30} xml={dots} />
        </Pressable>
      </View>
      <View style={tw`items-center justify-end flex-grow`}>
        {photo && (
          <View style={tw`items-center justify-center flex-grow`}>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: vw(100), height: vh(60) }}
            />
            <Button onPress={handleUploadPhoto} title="Upload photo" />
          </View>
        )}
        <Button onPress={handleChoosePhoto} title="Choose photo" />
      </View>
    </View>
  );
}

import React, { useState } from "react";
import { TextInput, View, Pressable } from "react-native";
import tw from "twrnc";

// SVG
import { SvgXml } from "react-native-svg";

// Assets
import { eye, eye_off} from "./../assets/icons";

export default function Field({ title, autoComplete, type, value, setValue, icon }) {
  const [borderSize, setBorderSize] = useState(1);
  const isPassword = type === "password";
  const [see, setSee] = useState(isPassword);
  return (
    <View
      style={[
        tw`flex-row items-center w-64 px-2 mb-5 h-14`,
        {
          backgroundColor: "#fff",
          borderRadius: 7,
          borderColor: "#60AEC2",
          borderWidth: borderSize,
        },
      ]}
    >
      <SvgXml style={tw`dark:text-[#fff] mx-2`} xml={icon} width={25} height={25} />
      <TextInput
        style={tw` flex-grow-1`}
        secureTextEntry={see}
        onChangeText={(text) => setValue(text)}
        defaultValue={value}
        placeholder={title}
        onFocus={() => {
          setBorderSize(2);
        }}
        onBlur={() => {
          setBorderSize(1);
        }}
        autoComplete={autoComplete}
      />
      {isPassword && (
        <Pressable
        style={tw`mx-2`}
          onPress={() => {
            setSee(!see);
          }}
        >
          <SvgXml xml={see ? eye : eye_off} width={32} height={32} />
        </Pressable>
      )}
    </View>
  );
}

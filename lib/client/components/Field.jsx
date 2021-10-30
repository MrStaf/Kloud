import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

export default function Field({ title, autoComplete, type, value, setValue }) {
  const [borderSize, setBorderSize] = useState(1);
  const isPassword = type === "password";
  return (
    <View>
      <TextInput
        style={[tw`w-64 px-6 mb-5 h-14`,{
          backgroundColor: "#fff",
          borderRadius: 15,
          borderColor: "#60AEC2",
          borderWidth: borderSize,
        }]}
        secureTextEntry={isPassword}
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
    </View>
  );
}

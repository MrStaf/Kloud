import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

export default function Field({ title, autoComplete, type }) {
  const [text, setText] = useState("");
  const [borderSize, setBorderSize] = useState(1);
  const isPassword = type === "password";
  return (
    <View>
      <TextInput
        style={{
          height: "3.25rem",
          paddingHorizontal: "1.5rem",
          backgroundColor: "#fff",
          borderRadius: 15,
          borderColor: "#60AEC2",
          borderWidth: borderSize,
          outline: "none",
          marginBottom: "1.2rem",
        }}
        secureTextEntry={isPassword}
        onChangeText={(text) => setText(text)}
        defaultValue={text}
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

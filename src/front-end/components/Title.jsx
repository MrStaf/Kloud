import React from 'react'
import { Text } from 'react-native'
import tw from "twrnc";

export default function Title({text}) {
    return (
      <Text style={tw`text-4xl dark:text-[#fff] text-[#666666]`}>{text}</Text>
    );
  }
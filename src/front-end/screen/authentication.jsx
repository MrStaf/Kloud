import React, { useState, useEffect } from "react";
import { Text, View, Image, Pressable } from "react-native";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";

// Images
import logo from "./../assets/logo.png";

// Components
const Key = ({ num, setPass, pass }) => {
  const [bg, setBg] = useState("#fff");
  return (
    <Pressable
      onPress={() => {
        if (num === "C") {
          setPass([]);
        } else if (num === "D") {
          let newPass = pass;
          newPass.pop();
          setPass([...newPass]);
        } else if (pass.length < 4) {
          setPass([...pass, num]);
        }
      }}
      onPressIn={() => {
        setBg("#60AEC2");
      }}
      onPressOut={() => {
        setBg("#fff");
      }}>
      <View style={tw`h-16 w-16 mx-2 my-2 bg-[${bg}] rounded-full border border-[#60AEC2] flex justify-center items-center`}>
        <Text>{num}</Text>
      </View>
    </Pressable>
  );
};

const Dot = ({ filled }) => {
  let bg = filled ? "#60AEC2" : "#ffffff";
  return <View style={tw`mx-4 w-4 h-4 bg-[${bg}] rounded-full border border-[#60AEC2]`}></View>;
};

const Dots = ({ pass }) => {
  return (
    <View style={tw`flex-row justify-between`}>
      <Dot filled={pass.length > 0} />
      <Dot filled={pass.length > 1} />
      <Dot filled={pass.length > 2} />
      <Dot filled={pass.length > 3} />
    </View>
  );
};

async function save(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

const handleLogIn = (password, navigation) => {
  if (password.length < 3) {
    return;
  }
  SecureStore.getItemAsync("pass_").then((data) => {
    if (password.join("") === data.split('"').join("")) {
      navigation.navigate("Home");
    }
  }).catch(err => {
    SecureStore.deleteItemAsync("pass_");
  })
};

const handleCreatePassword = (password, setHasPass) => {
  if (password.length < 3) {
    return;
  }
  console.log(password)
  save("pass_", password.join(""));
  setHasPass(true);
};

export default function Authentication({ navigation }) {
  const [pass, setPass] = useState([]);
  const hasPin = async () => {
    const log = await SecureStore.getItemAsync("pass_");
    return log !== null
  }
  const [hasPass, setHasPass] = useState(hasPin())
  const hasSavedPass = async () => {
    const user = await SecureStore.getItemAsync("user_");
    if (user === null) {
      navigation.navigate("LandPage");
    }
  };
  useEffect(() => {
    hasSavedPass();
  }, []);
  useEffect(() => {
    hasPin()
    .then(bool => 
      setHasPass(bool)
    )
  }, [])

  return (
    <View style={tw`flex-1 items-center justify-between px-8 py-16 bg-[#F3F0E6] dark:bg-[#252525]`}>
      <StatusBar style="auto" />
      <View style={tw`mt-0`}>
        <Image source={logo} style={{ width: 400, height: 65, resizeMode: "contain" }} />
        <Text style={tw`font-bold text-3xl text-[#60AEC2] mx-8 mt-4`}>{hasPass ? "Authentication required" : "Create your code"}</Text>
      </View>
      <View style={tw`justify-center`}>
        <Dots pass={pass} />
        <View style={tw`flex-row flex-wrap justify-center w-64 mt-8`}>
          <Key num={1} setPass={setPass} pass={pass} />
          <Key num={2} setPass={setPass} pass={pass} />
          <Key num={3} setPass={setPass} pass={pass} />
          <Key num={4} setPass={setPass} pass={pass} />
          <Key num={5} setPass={setPass} pass={pass} />
          <Key num={6} setPass={setPass} pass={pass} />
          <Key num={7} setPass={setPass} pass={pass} />
          <Key num={8} setPass={setPass} pass={pass} />
          <Key num={9} setPass={setPass} pass={pass} />
          <Key num="C" setPass={setPass} pass={pass} />
          <Key num={0} setPass={setPass} pass={pass} />
          <Key num="D" setPass={setPass} pass={pass} />
        </View>
      </View>
      <View>
        {hasPass && (
          <View style={tw`flex-row justify-center w-64`}>
            <Pressable
              onPress={() => {
                navigation.navigate("Register");
              }}>
              <Text style={tw`text-[#60AEC2] font-bold`}>Forgot ?</Text>
            </Pressable>
          </View>
        )}
        <Pressable
          onPress={async () => {
            if (await hasPin()) {
              setHasPass(true)
              handleLogIn(pass, navigation);
            } else {
              handleCreatePassword(pass, setHasPass);
            }
            setPass([]);
          }}>
          <View style={tw`w-full py-4 bg-[#60AEC2] flex items-center justify-center rounded-xl mt-2 w-64`}>
            <Text style={tw`text-[#fff]`}>{hasPass ? "Log In" : "Create your code"}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

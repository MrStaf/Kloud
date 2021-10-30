// React Native
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Pressable,
} from "react-native";
import * as SecureStore from "expo-secure-store";

// SVG
import { SvgXml } from "react-native-svg";

// Styles
import tw from "twrnc";
import { vw } from "react-native-expo-viewport-units";

// Assets
import { logout } from "./../assets/icons";

// Effects

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd6-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd6-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-14551e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e9d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e2972",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      tw`p-3 m-3 rounded-xl`,
      backgroundColor,
      { width: vw(42), height: vw(42) },
    ]}
  >
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 32,
  },
});

export default function Photos({ navigation, logged, setLogged }) {
  const [data, setData] = useState(DATA);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  // useLogin(navigation);
  const handleLogOut = () => {
    setLogged(false);
    SecureStore.deleteItemAsync('user_');
    SecureStore.deleteItemAsync('pass_');
    navigation.navigate("LandPage")
  }
  const onRefresh = () => {
    setRefreshing(true);
    setData([
      ...data,
      {
        id: Date.now(),
        title: `${data.length} Title`,
      },
    ]);
    setRefreshing(false);
  };
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("ModalPhoto", {
            id: item.id,
          })
        }
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  useEffect(() => {
    
  }, [])
  return (
    <SafeAreaView
      style={tw`flex-1 items-center justify-between bg-[#F3F0E6] dark:bg-[#252525] pt-8`}
    >
      <StatusBar style="auto" />
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View style={tw`flex-row justify-between w-full px-8 py-4`}>
              <Text style={tw`text-4xl text-[#333333]`}>Photos</Text>
              <Pressable onPress={handleLogOut}>
                <SvgXml xml={logout} width={40} height={40} />
              </Pressable>
            </View>
          );
        }}
        style={tw`w-full`}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        contentContainerStyle={tw`items-center w-full`}
        ListHeaderComponentStyle={tw`w-full`}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
}

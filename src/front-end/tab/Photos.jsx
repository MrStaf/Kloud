// React Native
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, StyleSheet, FlatList, SafeAreaView, RefreshControl, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";

// SVG
import { SvgXml } from "react-native-svg";

// Styles
import tw from "twrnc";
import { vw } from "react-native-expo-viewport-units";

// Assets
import { add } from "./../assets/icons";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function Photos({ navigation, route }) {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const onEndReached = () => {
    setRefreshing(true);
    SecureStore.getItemAsync("user_")
      .then((user) => {
        let userParsed = JSON.parse(user);
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
          "auth-token": userParsed.token,
        };
        fetch(`https://kloud.benoit.fage.fr/api/photos/all/?start=${data.length}&limit=${data.length + 2}`, {
          method: "GET",
          headers: headersList,
        })
          .then(function (response) {
            return response.json();
          })
          .then((fetched_data) => {
            // TODO: Alert when fetched_data.data.length = 0;
            console.log("fetched_onEndReached", fetched_data.data);
            const fetched_data_ = fetched_data.data.map((id) => {
              return {
                id: id,
                uri: "https://kloud.benoit.fage.fr/api/photos/id/" + id,
              };
            });
            const newData = [...data, ...fetched_data_].filter(onlyUnique);
            setData(newData);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
    setRefreshing(false);
  };
  const onRefresh = async (start = -1) => {
    setRefreshing(true);
    SecureStore.getItemAsync("user_")
      .then((user) => {
        let userParsed = JSON.parse(user);
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
          "auth-token": userParsed.token,
        };
        fetch(`https://kloud.benoit.fage.fr/api/photos/all/?start=0-&limit=${data.length + 2}`, {
          method: "GET",
          headers: headersList,
        })
          .then(function (response) {
            return response.json();
          })
          .then((fetched_data) => {
            // TODO: Alert when fetched_data.data.length = 0;
            console.log("fetched_onRefresh", fetched_data.data);
            const fetched_data_ = fetched_data.data.map((id) => {
              return {
                id: id,
                uri: "https://kloud.benoit.fage.fr/api/photos/id/" + id,
              };
            });
            setData(fetched_data_);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });

    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      setData([]);
      onRefresh(0);
      navigation.setParams({
        refresh: false,
      });
    }
  }, [route.params]);

  const onPress = () => {
    navigation.navigate("ModalUpload");
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-between bg-[#F3F0E6] dark:bg-[#252525] pt-8`}>
      <StatusBar style="auto" />
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View style={tw`flex-row justify-between w-full px-8 py-4`}>
              <Text style={tw`text-4xl text-[#666666]`}>Photos</Text>
              <Pressable onPress={onPress}>
                <SvgXml xml={add} width={40} height={40} />
              </Pressable>
            </View>
          );
        }}
        style={tw`w-full`}
        numColumns={2}
        data={data}
        onEndReached={onEndReached}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("ModalPhoto", {
                  id: item.id,
                });
              }}
              style={[tw`m-3 rounded-xl bg-[#ffffff]`, { width: vw(42), height: vw(42) }]}>
              {/* TODO: Add progressive loading funct */}
              <Image
                source={{ uri: "https://kloud.benoit.fage.fr/api/photos/id/" + item.id }}
                style={[
                  tw`rounded-xl`,
                  {
                    width: vw(42),
                    height: vw(42),
                    resizeMode: "cover",
                  },
                ]}
              />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        contentContainerStyle={[tw`items-start`, { marginLeft: vw(2) }]}
        ListHeaderComponentStyle={tw`w-full`}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      />
      {data.length === 0 && <Text style={tw`text-[#777777]`}>No photos found.</Text>}
    </SafeAreaView>
  );
}

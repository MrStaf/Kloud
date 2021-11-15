// React Native
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, Image, FlatList, RefreshControl, Pressable } from "react-native";
import Toast from "react-native-toast-message";

// Functions
import fetchApi from "./../functions/fetchApi";

// Local
import Title from "./../components/Title";
import Header from "./../components/Header";
import SafeAreaView from "./../components/SafeAreaView";

// Styles
import tw from "twrnc";
import { vw } from "react-native-expo-viewport-units";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function Favorite({ navigation, route }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onEndReached = async () => {
    setRefreshing(true);
    const res = await fetchApi({
      endPoint: `photos/fav/?start=${data.length}&limit=${data.length + 2}`,
      method: "GET",
      verify: true,
    });

    if (res.status === "FAILED") {
      Toast.show({
        type: "error",
        text1: "Unable to fetch data",
        text2: res.message,
      });
      setRefreshing(false);
      return;
    }
    const fetched_data = res.data.map((id) => {
      return {
        id: id,
        uri: "https://kloud.benoit.fage.fr/api/photos/id/" + id,
      };
    });
    const newData = [...data, ...fetched_data].filter(onlyUnique);
    setData(newData);
    setRefreshing(false);
  };
  useEffect(() => {
    onEndReached();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      setData([]);
      onEndReached();
      navigation.setParams({
        refresh: false,
      });
    }
  }, [route.params]);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <FlatList
        ListHeaderComponent={() => {
          return (
            <Header>
              <Title text="Fav" />
            </Header>
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
              style={[
                tw`m-3 rounded-xl bg-[#ffffff]`,
                { width: vw(42), height: vw(42) },
              ]}
            >
              {/* TODO: Add progressive loading funct */}
              <Image
                source={{
                  uri: "https://kloud.benoit.fage.fr/api/photos/id/" + item.id,
                }}
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
        contentContainerStyle={[tw`items-start`, { marginLeft: vw(2) }]}
        ListHeaderComponentStyle={tw`w-full`}
        refreshControl={
          <RefreshControl onRefresh={onEndReached} refreshing={refreshing} />
        }
      />
      {data.length === 0 && (
        <Text style={tw`text-[#777777] w-full text-center`}>
          No photos found.
        </Text>
      )}
    </SafeAreaView>
  );
}

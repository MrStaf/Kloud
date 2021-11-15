// React Native
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";

// Functions
import fetchApi from "./../functions/fetchApi";

// Local
import Title from "./../components/Title";
import Header from "./../components/Header";
import SafeAreaView from "./../components/SafeAreaView";

// SVG
import { SvgXml } from "react-native-svg";

// Styles
import tw from "twrnc";
import { vw } from "react-native-expo-viewport-units";

// Assets
import { add, add_white } from "./../assets/icons";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function Photos({ navigation, route }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onEndReached = async () => {
    setRefreshing(true);
    const res = await fetchApi({
      endPoint: `album/alb/?start=${data.length}&limit=${data.length + 2}`,
      method: "GET",
      verify: true,
    });

    if (res.data.length === 0) {
      setRefreshing(false);
      return;
    }

    if (res.status === "FAILED") {
      Toast.show({
        type: "error",
        text1: "Unable to fetch data",
        text2: res.message,
      });
      setRefreshing(false);
      return;
    }
    const albums = await Promise.all(
      res.data.map(async (album) => {
        const id = await fetchApi({
          endPoint: `photos/alb/${album._id}?start=0&limit=1`,
          method: "GET",
          verify: true,
        });
        const photoId = id?.data[0];
        return { ...album, photoId };
      })
    );
    const newData = [...data, ...albums].filter(onlyUnique);
    setData(newData);
    setRefreshing(false);
  };
  const onRefresh = async () => {
    setData([]);
    onEndReached();
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

  const onPress = () => {
    navigation.navigate("ModalCreateAlbum");
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <FlatList
        ListHeaderComponent={() => {
          return (
            <Header>
              <Title text="Albums" />
              <Pressable onPress={onPress}>
                <SvgXml
                  style={tw`hidden dark:flex`}
                  xml={add_white}
                  width={40}
                  height={40}
                />
                <SvgXml
                  style={tw`flex dark:hidden`}
                  xml={add}
                  width={40}
                  height={40}
                />
              </Pressable>
            </Header>
          );
        }}
        style={tw`w-full`}
        numColumns={2}
        data={data}
        onEndReached={onEndReached}
        renderItem={({ item, index }) => {
          console.log(item);
          return (
            <View style={[tw`flex-col m-3`, { width: vw(42) }]}>
              <Pressable
                onPress={() => {
                  navigation.navigate("ModalViewAlbum", {
                    id: item._id,
                  });
                }}
                style={[
                  tw`rounded-xl bg-[#ffffff]`,
                  { width: vw(42), height: vw(42) },
                ]}
              >
                {/* TODO: Add progressive loading funct */}
                <Image
                  source={{
                    uri:
                      "https://kloud.benoit.fage.fr/api/photos/id/" +
                      item.photoId,
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
              <Text
                style={tw`text-[#000] dark:text-[#fff] w-full text-center flex-wrap`}
              >
                {item.name}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[tw`items-start`, { marginLeft: vw(2) }]}
        ListHeaderComponentStyle={tw`w-full`}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
      {data.length === 0 && (
        <Text style={tw`text-[#777777] w-full text-center`}>
          No albums found.
        </Text>
      )}
    </SafeAreaView>
  );
}

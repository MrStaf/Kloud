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
import { dots, goBack } from "./../assets/icons";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function modalViewAlbum({ navigation, route }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [album, setAlbum] = useState({});
  const [menu, setMenu] = useState(false);

  const id =
    navigation.getState().routes[navigation.getState().index].params.id;

  const handleDelete = async () => {
    const response = await fetchApi({
      endPoint: `album/id/${id}`,
      method: "DELETE",
      verify: true,
    })
    if (response.status === "SUCCESS") {
      Toast.show({
        type:"success",
        text1: response.message,
      })
      navigation.goBack();
      return
    }
    Toast.show({
      type: "error",
      text1: response.message
    })
  }
  const onEndReached = async () => {
    setRefreshing(true);
    const res = await fetchApi({
      endPoint: `photos/alb/${id}?start=${data.length}&limit=${
        data.length + 2
      }`,
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
    const newData = [...data, ...res.data].filter(onlyUnique);
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
    const getAlb = async () => {
      const res = await fetchApi({
        endPoint: `album/id/${id}`,
        method: "GET",
        verify: true,
      });
      if (res.status === "SUCCESS") {
        setAlbum(res.data);
      }
    };
    getAlb();
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
              <Pressable onPress={() => navigation.goBack()}>
                <SvgXml xml={goBack} width={40} height={40} />
              </Pressable>
              <Title text={album?.name} />
              <Pressable onPress={() => setMenu(!menu)}>
                <SvgXml xml={dots} width={40} height={30} />
              </Pressable>
              <View
                style={[
                  tw`z-20 absolute right-0 top-[13] bg-[#ffffff] dark:bg-[#000000] rounded-lg ${
                    menu ? "px-3 py-2" : ""
                  }`,
                  { display: menu ? "flex" : "none" },
                ]}
              >
                <Pressable onPress={handleDelete} style={tw`z-20`}>
                  <View style={[tw`py-1`, { display: menu ? "flex" : "none" }]}>
                    <Text
                      style={tw`text-[#000000] text-lg dark:text-[#ffffff]`}
                    >
                      Delete Album
                    </Text>
                  </View>
                </Pressable>
              </View>
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
            <Pressable
              onPress={() => {
                navigation.navigate("ModalPhoto", {
                  id: item,
                });
              }}
              style={[
                tw`rounded-xl bg-[#ffffff] m-3`,
                { width: vw(42), height: vw(42) },
              ]}
            >
              {/* TODO: Add progressive loading funct */}
              <Image
                source={{
                  uri: "https://kloud.benoit.fage.fr/api/photos/id/" + item,
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

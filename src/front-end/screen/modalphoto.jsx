// React Native
import React, { useEffect, useState } from "react";
import { View, Button, Text, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Modules
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import * as SecureStore from "expo-secure-store";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from "react-native-popup-dialog";

// Styles
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import { vw, vh } from "react-native-expo-viewport-units";
import Constants from "expo-constants";

// Icons
import { dots, goBack, heart, heart_filled } from "../assets/icons";

export default function ModalPhoto({ navigation, route }) {
  const [fav, setFav] = useState(false);
  const [menu, setMenu] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [scaleAnimationDialog, setScaleAnimationDialog] = useState(false);
  const [img, setImg] = useState("");
  const [imgData, setImgData] = useState({});
  const [albums, setAlbums] = useState([]);
  const id =
    navigation.getState().routes[navigation.getState().index].params.id;

  const handleDelete = () => {
    SecureStore.getItemAsync("user_").then((user) => {
      const userParsed = JSON.parse(user);
      let headersList = {
        Accept: "*/*",
        "auth-token": userParsed.token,
      };

      fetch("https://kloud.benoit.fage.fr/api/photos/id/" + id, {
        method: "DELETE",
        headers: headersList,
      }).then(() => {
        navigation.navigate({
          name: "Photos",
          params: { refresh: true },
          merge: true,
        });
      });
    });
  };
  const handleFav = async () => {
    setFav(!fav);
    SecureStore.getItemAsync("user_").then((data) => {
      const userParsed = JSON.parse(data);
      let headersList = {
        Accept: "*/*",
        "auth-token": userParsed.token,
        "Content-Type": "application/json",
      };
      fetch(
        `https://kloud.benoit.fage.fr/api/photos/fav/${fav ? "remove" : "add"}`,
        {
          method: "PATCH",
          body: `{\n    \"photoId\": \"${id}\"\n}`,
          headers: headersList,
        }
      )
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          // console.log(data);
        })
        .catch(() => {
          setFav(!fav);
        });
    });
  };
  const handleAlbums = () => {
    SecureStore.getItemAsync("user_").then((user) => {
      const userParsed = JSON.parse(user);
      let headersList = {
        Accept: "*/*",
        "auth-token": userParsed.token,
        "Content-Type": "application/json",
      };
      fetch(
        `https://kloud.benoit.fage.fr/api/album/${
          album.present ? "remove" : "add"
        }`,
        {
          method: "PATCH",
          body: `{\n    \"albumId\": \"${album._id}\",\n    \"photoId\": \"${id}\"\n}`,
          headers: headersList,
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          const newAlbums = albums;
          newAlbums.map((alb) => {
            if (alb._id === album._id) {
              alb.present = !alb.present;
            }
            console.log(alb);
            return alb;
          });
          setRefresh(true);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };
  useEffect(() => {
    if (refresh) {
      SecureStore.getItemAsync("user_").then((data) => {
        const userParsed = JSON.parse(data);
        let headersList = {
          Accept: "*/*",
          "auth-token": userParsed.token,
          "Content-Type": "application/json",
        };
        fetch("https://kloud.benoit.fage.fr/api/photos/meta/" + id, {
          method: "GET",
          headers: headersList,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            setImgData(data.data);
            setFav(data.data.favorite);
            fetch("https://kloud.benoit.fage.fr/api/album", {
              method: "GET",
              headers: headersList,
            })
              .then((res) => {
                return res.json();
              })
              .then((albums_fetched) => {
                // console.log(albums_fetched);
                const data_parsed = albums_fetched.data.map((album) => {
                  const albums_filtered = data.data.albums?.filter((itm) => {
                    return itm === album._id;
                  });
                  return {
                    _id: album._id,
                    name: album.name,
                    date: album.date,
                    userId: album.userId,
                    present: albums_filtered.length === 1,
                  };
                });
                setAlbums(data_parsed);
                setRefresh(false);
              })
              .catch((err) => {
                console.error(err);
              });
          });
      });
    }
  }, [route.params, refresh]);

  return (
    <View
      style={[
        tw`relative h-full bg-[#F3F0E6] dark:bg-[#252525]`,
        {
          paddingTop: Constants.statusBarHeight,
        },
      ]}
    >
      <View style={tw`z-10 flex-row items-center justify-between m-4`}>
        <TouchableOpacity
          onPress={() => {
            setImg("");
            navigation.goBack();
          }}
        >
          <SvgXml width={40} height={40} xml={goBack} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMenu(!menu);
          }}
        >
          <SvgXml width={40} height={30} xml={dots} />
        </TouchableOpacity>
        <View
          style={[
            tw`absolute right-0 top-[11] bg-[#ffffff] dark:bg-[#000000] rounded-lg ${
              menu ? "px-3 py-2" : ""
            }`,
            { display: menu ? "flex" : "none" },
          ]}
        >
          <TouchableOpacity onPress={handleDelete} style={tw`z-20`}>
            <View style={[tw`py-1`, { display: menu ? "flex" : "none" }]}>
              <Text style={tw`text-[#000000] text-lg dark:text-[#ffffff]`}>
                Delete Photo
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScaleAnimationDialog(true)}>
            <View style={[tw`py-1`, { display: menu ? "flex" : "none" }]}>
              <Text style={tw`text-[#000000] text-lg dark:text-[#ffffff]`}>
                Add to album
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Dialog
          onTouchOutside={() => {
            setScaleAnimationDialog(false);
          }}
          width={0.9}
          visible={scaleAnimationDialog}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            setScaleAnimationDialog(false);
            console.log("onHardwareBackPress");
            return true;
          }}
          dialogTitle={
            <DialogTitle title="Select Albums" hasTitleBar={false} />
          }
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                setScaleAnimationDialog(false);
              }}
              key="button-1"
            />,
          ]}
        >
          <DialogContent>
            <View>
              {scaleAnimationDialog &&
                albums.map((album) => {
                  return (
                    <TouchableOpacity key={album._id} onPress={handleAlbums}>
                      <View style={tw`flex-row items-center mb-1`}>
                        <View
                          style={tw`h-4 w-4 rounded-sm mr-2 border-[#7777] ${
                            album.present ? "border bg-[#60AEC2]" : "bg-[#7777]"
                          }`}
                        ></View>
                        <Text style={tw`text-lg`}>{album?.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              <Button
                title="Close"
                onPress={() => {
                  setScaleAnimationDialog(false);
                }}
                key="button-1"
              />
            </View>
          </DialogContent>
        </Dialog>
      </View>

      <View
        style={[
          tw`justify-center flex-grow`,
          {
            marginBottom: Constants.statusBarHeight,
            maxHeight: vh(100) - Constants.statusBarHeight * 2,
          },
        ]}
      >
        <ReactNativeZoomableView
          maxZoom={2}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          longPressDuration={50}
          onLongPress={() => {
            alert("description");
          }}
        >
          <Image
            source={{ uri: "https://kloud.benoit.fage.fr/api/photos/id/" + id }}
            style={{
              width: vw(100),
              height: vh(80),
              resizeMode: "contain",
            }}
          />
        </ReactNativeZoomableView>
      </View>
      <View
        style={[
          tw`absolute bottom-0 z-10 items-center w-full`,
          {
            padding: Constants.statusBarHeight,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        ]}
      >
        <TouchableOpacity onPress={handleFav}>
          <SvgXml
            width={40}
            height={30}
            xml={imgData.favorite ? heart_filled : heart}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

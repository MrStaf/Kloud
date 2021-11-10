import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function useLogin(navigation) {
  useEffect(() => {
    SecureStore.getItemAsync("user_").then(res =>  {
        console.log(res)
        if (res === null) {
            navigation.navigate("LandPage");
        }
    })
  }, []);
}

import { setItemAsync } from "expo-secure-store";

export default async function save(key, value) {
  await setItemAsync(key, value);
}

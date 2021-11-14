import { getItemAsync } from "expo-secure-store";

export default async function fetchApi({ endPoint, method, verify = false, body }) {
  let headersList;
  if (verify) {
    const user = await getItemAsync("user_");
    if (!user) return;
    const userParsed = JSON.parse(user);
    headersList = {
      Accept: "*/*",
      "auth-token": userParsed.token,
      "Content-Type": "application/json",
    };
  }
  const response = await fetch(`https://kloud.benoit.fage.fr/api/${endPoint}`, {
      body: JSON.stringify(body),
      headers: headersList,
      method: method,
  })
  const res = await response.json();
  console.log(res)
  return res;
}
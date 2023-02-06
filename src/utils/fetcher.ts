import axios from "axios";

async function fetcher(url: string) {
  return await axios.get(url);
}

export async function fetchCoins() {
  const result = await fetcher("/data/coins.json");

  return result.data;
}

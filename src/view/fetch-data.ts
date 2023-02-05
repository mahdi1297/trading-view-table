import { fetcher } from "../utils/fetcher";

export const fetchCoinData = async (): Promise<any> => {
  const result = await fetcher("/data/coins.json");
  return result.data;
};

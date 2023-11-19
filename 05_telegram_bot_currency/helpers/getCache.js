import { getCurrencyExchange } from "../api/index.js";

export const getCache = async (myCache) => {
  const cache = myCache.get("currency");
  if (!cache) {
    const currency = await getCurrencyExchange();
    myCache.set("currency", currency, 60);
    const cache = myCache.get("currency");
    return cache;
  }
  return cache;
};

export default getCache;

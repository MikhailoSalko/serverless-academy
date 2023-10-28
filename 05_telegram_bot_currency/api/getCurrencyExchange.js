import axios from "axios";
import { USD, EUR } from "../constans.js";

const { PRIVATBANK_API, MONOBANK_API } = process.env;

const privatbankInstace = axios.create({
  baseURL: PRIVATBANK_API,
});

const monobankInstace = axios.create({
  baseURL: MONOBANK_API,
});

const getCurrencyExchange = async () => {
  const { data: privat } = await privatbankInstace.get();
  const { data: mono } = await monobankInstace.get();

  return [...privat, ...mono.slice(0, 2)];
};

export default getCurrencyExchange;

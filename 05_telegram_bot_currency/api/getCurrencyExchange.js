import axios from "axios";

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
  const monoSlice = mono.slice(0, 2);

  // const currency = {
  //   dollar: [privat[0], monoSlice[1]],
  //   euro: [privat[1], monoSlice[0]],
  // };

  return {
    dollar: [privat[1], monoSlice[0]],
    euro: [privat[0], monoSlice[1]],
  };
  // return [...privat, ...mono.slice(0, 2)];
};

export default getCurrencyExchange;

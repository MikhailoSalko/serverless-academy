import axios from "axios";

const { WEATHER_API_KEY } = process.env;

const weatherInstance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/forecast?appid=${WEATHER_API_KEY}&id=687700`,
});

export default weatherInstance;

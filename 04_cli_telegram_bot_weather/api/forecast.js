import axios from "axios";

const { WEATHER_API_KEY, ZAPORIZHIA } = process.env;

const weatherInstance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/forecast?q=${ZAPORIZHIA}&cnt=10&units=metric&appid=${WEATHER_API_KEY}`,
});

const forecast = async (time) => {
  let sixHoursResult = [];
  const { data } = await weatherInstance.get();

  if (time === "3") {
    return data;
  } else if (time === "6") {
    const timestamps = data.list;
    for (let i = 0; i < timestamps.length; i += 2) {
      sixHoursResult.push(timestamps[i]);
    }
    return sixHoursResult;
  }
};

export default forecast;

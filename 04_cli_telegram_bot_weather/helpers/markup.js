const markup = (list) => {
  const markup = list
    .map((el) => {
      return `
    -------------------------------------------------------------------------------
    1. Weather forecast time: ${el.dt_txt}
    2. Weather description: ${el.weather[0].main}, ${el.weather[0].description}
    3. Temperature: ${el.main.temp} °C
    4. Pressure: ${el.main.pressure} inHg
    5. Cloudiness: ${el.clouds.all} %
    6. Wind speed: ${el.wind.speed} m/s
    -------------------------------------------------------------------------------
    `;
    })
    .join("");
  return markup;
};

export default markup;

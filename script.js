"use strict";
///How to use///
// You can modify default options by changing the options object and passing it as a parameter of displayCustomWeather function. The default settings are: {
//     selector: ".container", inner html of passed selector will be replace by weather app
//     temperature: "celsius", you can set "fahrenheit" as your main temperature
//     displayIcon: true, you can disable weather icon by setting it to false ("no img" picture will be displayed)
//   };
// Additionaly you can add to options additional data by passing any key from settingDesc object and set it's value to true to render any info provided by API

function displayCustomWeather(options) {
  const defaults = {
    selector: ".container",
    temperature: "celsius",
    displayIcon: true,
  };

  const settings = { ...defaults, ...options };
  const settingsDesc = {
    lat: "Latitude (Degrees)",
    lon: "Longitude (Degrees)",
    sunrise: "Sunrise time (HH:MM)",
    sunset: "Sunset time (HH:MM)",
    timezone: "Local IANA Timezone",
    station: "Source station ID",
    ob_time: "Last observation time",
    datetime: "Current cycle hour",
    ts: "Last observation time (Unix timestamp)",
    city_name: "City name",
    country_code: "Country abbreviation",
    state_code: "State abbreviation/code",
    pres: "Pressure (mb)",
    slp: "Sea level pressure (mb)",
    wind_spd: "Wind speed (Default m/s)",
    wind_dir: "Wind direction (degrees)",
    wind_cdir: "Abbreviated wind direction",
    wind_cdir_full: "Verbal wind direction",
    temp: "Temperature (default Celcius)",
    app_temp: `Apparent/"Feels Like" temperature (default Celcius)`,
    rh: "Relative humidity (%)",
    dewpt: "Dew point (default Celcius)",
    clouds: "Cloud coverage (%)",
    pod: "Part of the day (d = day / n = night)",
    vis: "Visibility (default KM)",
    precip: "Liquid equivalent precipitation rate (default mm/hr)",
    snow: "Snowfall (default mm/hr)",
    uv: "UV Index (0-11+)",
    aqi: "Air Quality Index [US - EPA standard 0 - +500",
    dhi: "Diffuse horizontal solar irradiance (W/m^2) [Clear Sky]",
    dni: "Direct normal solar irradiance (W/m^2) [Clear Sky]",
    ghi: "Global horizontal solar irradiance (W/m^2) [Clear Sky]",
    solar_rad: "Estimated Solar Radiation (W/m^2)",
    elev_angle: "Solar elevation angle (degrees)",
    h_angle: "Solar hour angle (degrees)",
  };
  const ipapiUrl = "https://ipapi.co/json";
  const weatherBitKey = "6710952c5df84e0caa492440736fc990";
  const weatherBitUrl = "https://api.weatherbit.io/v2.0/current?";

  //Container validation
  let container = document.querySelector(settings.selector);
  if (!container) container = document.querySelector(defaults.selector);
  document.querySelector(defaults.selector).innerHTML = "";

  function displayOptionalInfo(weatherData) {
    let optionalHtml = "";
    for (const [key, value] of Object.entries(weatherData)) {
      if (settings[key] && settings[value] !== "undefined") {
        optionalHtml += `<p class="details-info">${settingsDesc[key]}: <span class="bold">${value}</span></p>`;
      }
    }
    return optionalHtml;
  }
  function displayInfo(weatherData) {
    const {
      city_name,
      weather: { description, icon },
      pres,
      wind_spd,
      app_temp: realFeel,
      rh: humidity,
    } = weatherData;
    let { temp: primaryTemp } = weatherData;
    //Temp
    let secondaryTemp = (primaryTemp * 9) / 5 + 32;
    let primaryTempUnit = "C";
    let secondaryTempUnit = "F";
    if (settings.temperature === "fahrenheit") {
      // Swapping variables values
      [primaryTemp, secondaryTemp, primaryTempUnit, secondaryTempUnit] = [
        secondaryTemp,
        primaryTemp,
        secondaryTempUnit,
        primaryTempUnit,
      ];
    }
    //Icon
    const src = settings.displayIcon
      ? `https://www.weatherbit.io/static/img/icons/${icon}.png`
      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    const html = `
    <h2>Current temperature in <span class="bold">${city_name}</span></h2>
    <div class="flex-container">
     <div class="weather-info"><img src=${src} alt=""></div>
     <p class="weather-info">${description}</p>
     <div class="weather-info">
      <p class="bold">${primaryTemp.toFixed(1)}°${primaryTempUnit}</p>
      <p class="secondary-temp">${secondaryTemp.toFixed(
        1
      )}°${secondaryTempUnit}</p>
     </div> 
    </div>
    <div class="details">
    <p class="details-info">Pressure: <span class="bold">${pres.toFixed()}mbar</span></p>
    <p class="details-info">Wind speed: <span class="bold">${wind_spd.toFixed()}km/h</span></p>
    <p class="details-info">Real feel: <span class="bold">${realFeel.toFixed(
      1
    )}&#176C</span></p>
    <p class="details-info">Humidity: <span class="bold">${humidity.toFixed()}%</span></p>
    ${displayOptionalInfo(weatherData)}
    </div>
    `;
    container.innerHTML = DOMPurify.sanitize(html);
  }

  async function getWeatherData() {
    try {
      const locationResponse = await fetch(ipapiUrl);
      const location = await locationResponse.json();
      const { latitude, longitude } = location;
      const weatherResponse = await fetch(
        `${weatherBitUrl}&lat=${latitude}&lon=${longitude}&key=${weatherBitKey}`
      );
      const weatherData = await weatherResponse.json();
      displayInfo(weatherData.data[0]);
    } catch (err) {
      console.warn(err.message);
    }
  }
  getWeatherData();
}
displayCustomWeather({
  lat: "Latitude (Degrees)",
  lon: true,
  sunrise: true,
  sunset: true,
  timezone: true,
  station: true,
  ob_time: true,
  datetime: true,
  ts: true,
  city_name: true,
  country_code: true,
  state_code: true,
  pres: true,
  slp: true,
  wind_spd: true,
  wind_dir: true,
  wind_cdir: true,
  wind_cdir_full: true,
  temp: true,
  app_temp: true,
  rh: true,
  dewpt: true,
  clouds: true,
  pod: true,
  vis: true,
  precip: true,
  snow: true,
  uv: true,
  aqi: true,
  dhi: true,
  dni: true,
  ghi: true,
  solar_rad: true,
  elev_angle: true,
  h_angle: true,
});

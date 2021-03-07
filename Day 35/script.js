"use strict"
{
  const container = document.querySelector(".container");
  const ipapiUrl = "https://ipapi.co/json";
  const weatherBitKey = "6710952c5df84e0caa492440736fc990";
  const weatherBitUrl = "https://api.weatherbit.io/v2.0/current?";

  function displayInfo({
    temp,
    city_name,
    weather: { description, icon },
    pres,
    wind_spd,
    app_temp: realFeel,
    rh: humidity,
  }) {
    const fahrenheitTemp = (temp * 9) / 5 + 32;
    container.innerHTML = `
    <h2>Current temperature in <span class="bold">${city_name}</span></h2>
    <div class="flex-container">
     <div class="weather-info"><img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt=""></div>
     <p class="weather-info">${description}</p>
     <div class="weather-info">
      <p class="bold">${temp}	&#176C</p>
      <p class="additional">${fahrenheitTemp}	&#176F</p>
     </div> 
    </div>
    <div class="details">
    <p class="details-info">Pressure: <span class="bold">${pres.toFixed()}mbar</span></p>
    <p class="details-info">Wind speed: <span class="bold">${wind_spd.toFixed()}km/h</span></p>
    <p class="details-info">Real feel: <span class="bold">${realFeel}&#176C</span></p>
    <p class="details-info">Humidity: <span class="bold">${humidity.toFixed()}%</span></p>
    </div>
    `;
  }

  // let latitude, longitude;

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

  // fetch(ipapiUrl)
  //   .then(function (response) {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       return Promise.reject(response);
  //     }
  //   })
  //   .then(function (data) {
  //     ({ latitude, longitude } = data);
  //     return fetch(
  //       `${weatherBitUrl}&lat=${latitude}&lon=${longitude}&key=${weatherBitKey}`
  //     );
  //   })
  //   .then(function (response) {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       return Promise.reject(response);
  //     }
  //   })
  //   .then(function (weatherData) {
  //     displayInfo(weatherData.data[0]);
  //   })
  //   .catch(function (error) {
  //     console.warn(error);
  //   });
}
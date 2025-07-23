import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("London");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response =
          await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72ce90d38552296ed66371f53bb86527
`);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(search);
    setSearch("");
  };

  return (
    <div>
      <h2>Weather in {city}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Saisir une ville ou un pays"
        />
        <button type="submit">Rechercher</button>
      </form>
      {weatherData && (
        <div>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;

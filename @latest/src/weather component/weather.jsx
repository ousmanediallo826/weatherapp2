import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const weatherApiKey = 'd5020c12f71da6197a7a5be69934c63e'; // Replace with your OpenWeatherMap API key
  const geocoderApiKey = '69a6e415e73442d4b60bd5b666983aa6'; // Replace with your OpenCage API key

  const getWeather = async () => {
    try {
      // Fetch geocoding data
      const geoResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geocoderApiKey}`);
      const geoData = await geoResponse.json();

      if (geoData.results.length === 0) {
        setError('Location not found');
        return;
      }

      const { lat, lng } = geoData.results[0].geometry;

      // Fetch weather data
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=metric`);
      const weatherData = await weatherResponse.json();

      setWeather(weatherData);
      setError(null);
    } catch (error) {
      setError('Error fetching the weather data');
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={(e) => getWeather(e)}>Get Weather</button>

      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;



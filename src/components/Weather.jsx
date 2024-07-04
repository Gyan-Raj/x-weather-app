import style from "./Weather.module.css";
import React, { useState } from "react";
import "./Weather.module.css";
import { fetchWeather } from "./api/Api";

const Weather = () => {
  const apiKey = "eeea3b0852454686b62210843240205";
  const [city, setCity] = useState("");
  const [cityDetail, setCityDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWeather(apiKey, city);
      if (!response) {
        alert("Failed to fetch weather data");
      }
      setCityDetail(response);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setCity(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className={style.weather}>
      <div className={style.searchBox}>
        <input
          type="text"
          name="city"
          value={city}
          className={style.input}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <button type="submit" onClick={handleClick}>
          Search
        </button>
      </div>
      {isLoading && <p>Loading data...</p>}
      {cityDetail && !isLoading && (
        <div className={style.outputBox}>
          <div className={style.output}>
            <p>Temperature</p>
            <p>
              {cityDetail.temp_c}
              <sup>°</sup>C
            </p>
          </div>
          <div className={style.output}>
            <p>Humidity</p>
            <p>{cityDetail.humidity}%</p>
          </div>
          <div className={style.output}>
            <p>Condition</p>
            <p>{cityDetail.condition.text}</p>
          </div>
          <div className={style.output}>
            <p>Wind Speed</p>
            <p>{cityDetail.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

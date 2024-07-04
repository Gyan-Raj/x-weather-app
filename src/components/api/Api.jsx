import axios from "axios";

export const fetchWeather = async (apiKey, city) => {
  try {
    let response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    // console.log(response.data.current);
    return response.data.current;
  } catch (error) {
    console.log(error);
  }
};

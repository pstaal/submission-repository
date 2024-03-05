import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const api_key = import.meta.env.VITE_SOME_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`
      )
      .then((response) => {
        let newWeather = {
          capital: country.capital,
          temp: (response.data.main.temp - 273.15).toFixed(2),
          wind: response.data.wind.speed,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        };
        setWeather(newWeather);
      });
  }, [country]);

  const { name, capital, area, languages, flag } = country;
  return (
    <>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h2>Languages:</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag.png} alt={flag.alt} />
      {weather && <Weather weather={weather} />}
    </>
  );
};

export default Country;

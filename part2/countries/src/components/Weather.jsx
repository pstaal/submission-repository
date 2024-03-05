const Weather = ({ weather }) => {
  console.log(weather);
  return (
    <>
      <h2>Weather in {weather.capital}</h2>
      <p> temperature {weather.temp} Celcius</p>
      <img src={weather.icon} alt="temp" />
      <p>wind {weather.wind} m/s</p>
    </>
  );
};

export default Weather;

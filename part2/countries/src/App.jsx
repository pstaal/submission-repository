import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        let countries = response.data.map((object) => object.name.common);
        countries = countries.filter((country) => country.includes(searchTerm));
        setCountries(countries);
        setCountry(null);
      });
  }, [searchTerm]);

  useEffect(() => {
    if (countries.length === 1) {
      let countryName = countries[0];
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
        )
        .then((response) => {
          let country = {
            name: response.data.name.common,
            capital: response.data.capital[0],
            area: response.data.area,
            languages: Object.values(response.data.languages),
            flag: response.data.flags,
          };
          setCountry(country);
          console.log(country);
        });
    }
  }, [countries]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showCountry = (name) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        let country = {
          name: response.data.name.common,
          capital: response.data.capital[0],
          area: response.data.area,
          languages: Object.values(response.data.languages),
          flag: response.data.flags,
        };
        setCountry(country);
        console.log(country);
      });
  };

  return (
    <>
      <Filter searchTerm={searchTerm} handleChange={handleChange} />
      {country ? (
        <Country country={country} />
      ) : (
        <Countries countries={countries} showCountry={showCountry} />
      )}
    </>
  );
}

export default App;

const Countries = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <>
      {countries.map((country) => {
        return (
          <p key={country}>
            {country}
            <button onClick={() => showCountry(country)}>show</button>
          </p>
        );
      })}
    </>
  );
};

export default Countries;

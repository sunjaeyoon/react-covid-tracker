import React, {useState, useEffect} from "react";
import './App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  //https://diseases.sh/v3/covid-19/countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['Worldwide']);

  //USEEFFECT
  useEffect(()=>{
    const getCountryData = async() => {
      await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country)=> (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));

        setCountries(countries);

      })
    }

    getCountryData();
  }, [countries]);
  
  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <h1>Covid 19 Tracker</h1>

      {/* Header */}
      <div className="app__header">
        <h1>Hello Start Here</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
          >
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country)=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            </Select>
        </FormControl>
      </div>
      {/* info */}
      <div className="app_stats">
        
      </div>
      {/* info */}
      {/* info */}

      {/**Table */}
      {/**Graph */}
      {/**Map   */}
    </div>
  );
}

export default App;

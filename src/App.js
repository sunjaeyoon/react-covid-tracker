import React, {useState, useEffect} from "react";
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox';
import MyMap from './MyMap';
import Table from './Table';
import LineGraph from './LineGraph';

import {sortData} from './util'

function App() {
  //https://diseases.sh/v3/covid-19/countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['Worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState({});

  //USEEFFECT
  useEffect(() => {
      fetch("https://corona.lmao.ninja/v3/covid-19/all")
      .then(response=>response.json())
      .then(data=>{
        setCountryInfo(data)
      })
  }, [])

  useEffect(()=>{
    const getCountryData = async() => {
      await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
      .then(response => response.json())
      .then((data) =>{
        const countries = data.map((country)=> (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));

        const sortedData = sortData(data)
        setTableData(sortedData);
        setCountries(countries);
      })
    }

    getCountryData();
  }, [countries]);
  
  //Change by Selecting a Country
  const onCountryChange = async(event) => {
    console.log(typeof tableData)
    const countryCode = event.target.value;

    const url = countryCode === "Worldwide" ? "https://corona.lmao.ninja/v3/covid-19/all" : `https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=>response.json())
    .then(data => {
      //Change State
      setCountry(countryCode);
      setCountryInfo(data);
    })

  }

  return (
    <div className="app">
      <div className="app__left">
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

      
  `     {/* info */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        {/**Map   */}
        <div className="app__map">
          {/*<MyMap/>*/}
        
        </div>
      </div>

      <div className="app__right">
        {/**Table */}
        {/**Graph */}
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            
              {/*<Table countries={tableData}></Table>*/}
            <h3>New Cases</h3>
              <LineGraph/>
              {/*<LineGraph />*/}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

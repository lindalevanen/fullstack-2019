import React, { useState, useEffect } from 'react'
import axios from 'axios'
// Not going to upload the access key to my public git repo
import { access_key } from './weather_access_key.js'

const WEATHER_URL = 'http://api.weatherstack.com/current?access_key=:key&query=:capital'

const Country = ({country, weather}) => (
  <div>
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map((l,i) => (
        <li key={i}>{l.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt='Country flag' width={200} />
    {weather && (
      <>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.temperature}</p>
        {weather.weather_icons[0] && (
          <img src={weather.weather_icons[0]} alt='' />
        )}
        <p>Wind: {weather.wind_speed} kph direction {weather.wind_dir}</p>
      </>
    )}
  </div>
)

const CountryList = ({countries, onShowClick}) => (
  <div>
    {countries.map((c, i) => (
      <div key={i}>
        <span>{c.name}</span>
        <button onClick={() => onShowClick(c)}>show</button>
      </div>
    ))}
  </div>
)

const App = () => {

  const [ newCountry, setNewCountry ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ countryList, setCountryList ] = useState([])
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryList(response.data)
      })
  }, [])

  const fetchWeather = capital => {
    const url = WEATHER_URL.replace(':key', access_key).replace(':capital', capital)
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
  }

  const handleCountryChange = e => {
    const text = e.target.value
    setNewCountry(text)
    let fCountries = []
    if (text) {
      fCountries = countryList.filter(c => 
        c.name.toLowerCase().startsWith(text.toLowerCase())
      )
    }
    setFilteredCountries(fCountries)
    if(fCountries.length === 1) {
      fetchWeather(fCountries[0].capital)
    } else {
      setWeather(null)
    }
  }

  const showCountry = country => {
    setFilteredCountries([country])
  }

  const renderContent = () => {
    if (filteredCountries.length === 0) {
      return <div />
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} weather={weather} />
    } else if (filteredCountries.length <= 10) {
      return <CountryList countries={filteredCountries} onShowClick={(c) => showCountry(c)} />
    } else {
      return <div>Too many matches, specify another filter</div>
    }
  }

  return (
    <div>
      find countries: <input value={newCountry} onChange={handleCountryChange} />
      {renderContent()}
    </div>
  )

}

export default App

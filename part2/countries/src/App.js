import axios from 'axios'
import React, { useState, useEffect } from 'react'


const Filter = ({onChange}) => <div>
  find countries <input onChange={onChange}/>
</div>


const Countries = ({countries, onCountrySelect}) => <div>
  {
    countries.map(country => 
      <div key={country.numericCode}>
        {country.name}
        <button onClick={() => onCountrySelect(country)}>select</button>
      </div>)
  }
</div>

const Weather = ({countryCapital}) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countryCapital}`)
    .then(response => {
      if (response.data && response.data.current) {
        const data = response.data.current
        setWeather({
          temp: `${data.temperature} Celcius`,
          wind: `${data.wind_speed} mph direction ${data.wind_dir}`,
          icon: data.weather_icons.length ? data.weather_icons[0] : "https://cdn2.iconfinder.com/data/icons/documents-and-files-v-2/100/doc-03-1024.png"
        })
      }
    })
  }, [countryCapital])

  return weather && weather.temp && weather.wind ? 
  <div>
    <h5>Weather in {countryCapital}</h5>
    <p><b>wemperature:</b> {weather.temp}</p>
    <img src={weather.icon} alt="Nah"/>
    <p><b>wind:</b> {weather.temp}</p>
  </div> :
  <div>Weather not found</div>
}


const DetailCountry = ({country}) => <div>
  <h5> {country.name} </h5>
  <p>capital: {country.capital}</p>
  <p>population: {country.population}</p>
  <div>
    <h6>languages</h6>
    <ul>
      {
        country.languages.map(lang => <li>${lang.name}</li>)
      }
    </ul>
  </div>
  <img src={country.flag} alt="Nothing"/>
  <Weather countryCapital={country.capital}/>
</div>

const Complain = () => <p>Too many matches, specify another filter</p>


const Content = ({ countries, selectedCountry, onCountrySelect }) => {
  if (countries.length > 10) {
    return <Complain/>
  } else if (selectedCountry) {
    return <DetailCountry country={selectedCountry}/>
  } else {
    return <Countries countries={countries} onCountrySelect={onCountrySelect}/>
  }
}

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {    
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => setCountries(response.data));
  }, []);

  const updateFilter = (e) => {
    setFilter(e.target.value)
    setSelectedCountry(null)
    const fc = countries.filter(c => c.name.indexOf(newFilter) !== -1)
    if (fc.length === 1) {
      setSelectedCountry(fc[0])
    }
  }

  const onCountrySelect = (country) => {
    setSelectedCountry(country)
  }
  
  const filteredCountries = countries.filter(c => c.name.indexOf(newFilter) !== -1)

  return (
    <div>
      <Filter onChange={updateFilter}/>
      {
        filteredCountries.length > 10 ?
        <Complain/> :
        <Content 
          countries={filteredCountries} 
          selectedCountry={selectedCountry}
          onCountrySelect={onCountrySelect}
        />
      }
    </div>
  )
}

export default App

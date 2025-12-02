import {useEffect, useState} from 'react'

import './App.css'

function App() {
  const [city] = useState('Freehold');

  useEffect(() => {
      fetch('https://api.geoapify.com/v1/geocode/search?text='+city+'&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
          .then(res => res.json())
          .then(data => {
              console.log(data)
          })
          .catch(err => console.log(err));
  }, [city]);

  const [latitude] = useState('37.312122');
  const [longitude] = useState('-122.0445');

  useEffect(() => {
      fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&daily=weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch')
          .then(res => res.json())
          .then(data => {
              console.log(data)
          })
  }, [latitude, longitude]);


  const [autoLocation] = useState('Marlboro');

  useEffect(() => {
      fetch('https://api.geoapify.com/v1/geocode/autocomplete?text='+autoLocation+'&type=city&limit=10&filter=countrycode%3Aus&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
          .then(res => res.json())
          .then(data => {
              console.log(data)
          })
          .catch(err => console.log(err));
  }, [autoLocation]);


  return (
    <>
      <div>

      </div>
    </>
  )

}

export default App

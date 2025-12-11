import {useEffect, useState} from 'react'
import type{weather} from './Hooks.ts'

export function Weather({weather}: {weather: weather}) {
    const [weatherData, setWeatherData] = useState(weather)
    useEffect(() => {setWeatherData(weather)}, [weather]);

    return(
        <>
            <div id='currentWeather'>
                {weatherData.current.temperature_2m}
                {weatherData.current.apparentWeather}
                {weatherData.current.is_day}
                {weatherData.current.relative_humidity_2m}
                {weatherData.current.weather_code}
                {weatherData.current.wind_direction_10m}
                {weatherData.current.wind_speed_10m}
                {weatherData.current.wind_gusts_10m}
            </div>
            {
                weatherData.hourly.time.map((_item, i) =>
                    <div id="hourly" key={i}>
                        {weatherData.hourly.apparent_temperature[i]},
                        {weatherData.hourly.is_day[i]},
                        {weatherData.hourly.precipitation[i]},
                        {weatherData.hourly.precipitation[i]},
                        {weatherData.hourly.relative_humidity_2m[i]},
                        {weatherData.hourly.temperature_2m[i]},
                        {weatherData.hourly.uv_index[i]},
                        {weatherData.hourly.visibility[i]},
                        {weatherData.hourly.weather_code[i]},
                        {weatherData.hourly.wind_direction_10m[i]},
                        {weatherData.hourly.wind_speed_10m[i]},
                        {weatherData.hourly.wind_gusts_10m[i]}
                    </div>
                    )
            }

            {
                weatherData.daily.time.map((_item, i) =>
                    <div id="daily" key={i}>
                        {weatherData.daily.apparent_temperature_max[i]},
                        {weatherData.daily.apparent_temperature_min[i]},
                        {weatherData.daily.precipitation_hours[i]},
                        {weatherData.daily.precipitation_probability_max[i]},
                        {weatherData.daily.precipitation_sum[i]},
                        {weatherData.daily.sunrise[i]},
                        {weatherData.daily.sunset[i]},
                        {weatherData.daily.temperature_2m_max[i]},
                        {weatherData.daily.temperature_2m_min[i]},
                        {weatherData.daily.uv_index_max[i]},
                        {weatherData.daily.weather_code[i]},
                        {weatherData.daily.wind_gusts_10m_max[i]},
                        {weatherData.daily.wind_speed_10m_max[i]}
                    </div>
                )
            }
        </>
    )
}
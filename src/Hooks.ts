import {useEffect, useState} from 'react'

export type weather = {
    current: weatherCurrent;
    daily: weatherDaily;
    hourly: weatherHourly;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
}

type weatherCurrent = {
    apparentWeather: number;
    interval: number;
    is_day: number;
    precipitation: number;
    relative_humidity_2m: number;
    temperature_2m: number;
    time: string;
    weather_code: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    wind_speed_10m: number;
}

type weatherDaily = {
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    precipitation_sum: number[];
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    uv_index_max: number[];
    weather_code: number[];
    wind_gusts_10m_max: number[];
    wind_speed_10m_max: number[];
}

type weatherHourly = {
    apparent_temperature: number[];
    is_day: number[];
    precipitation: number[];
    precipitation_probability: number[];
    relative_humidity_2m: number[];
    temperature_2m: number[];
    time: string[];
    uv_index: number[];
    visibility: number[];
    weather_code: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    wind_speed_10m: number[];
}


export function useSearch(location: string) {
    const [search, setSearch] = useState<{lat: number, lon: number}>({lat: 0, lon: 0});

    useEffect(() => {
            fetch('https://api.geoapify.com/v1/geocode/search?text=' + location + '&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
                .then(res => res.json())
                .then(data => {
                    setSearch(data.results[0]);
                })
                .catch(err => console.log(err));
    }, [location]);

    return [search.lat, search.lon];
}

export function useCoordinates(latitude: number, longitude: number) {
    const [results, setResults] = useState<weather | null>(null);

    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&daily=weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch')
            .then(res => res.json())
            .then(data => {
                setResults(data)
            })
    }, [latitude, longitude]);

    return results;
}

export function useAutoComplete(location: string) {
    const [search, setSearch] = useState<{formatted: string}[]>([]);

    useEffect(() =>
    {
        if (location.length > 0) {
            fetch('https://api.geoapify.com/v1/geocode/autocomplete?text=' + location + '&type=city&limit=10&filter=countrycode%3Aus&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
                .then(res => res.json())
                .then(data => {
                    setSearch(data.results)
                })
                .catch(err => console.log(err));
        }
    }, [location]);

    return search;
}
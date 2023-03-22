import { useState } from 'react';
import { CityCountry, DayJson, WeatherData, ResponseData } from './types';

export const WeatherService = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<ResponseData>();

  const makeRequest = async () => {
    setLoading(true);

    try {
      fetch(url).then((res) => {
        res.json().then((json) => {
          const cityCountry = {
            city: json.city.name,
            country: json.city.country,
          };
          const data = json.list
            .filter((day: DayJson) => day.dt_txt.includes('00:00:00'))
            .map((day: DayJson) => ({
              date: day.dt,
              temp: day.main.temp,
              feelsLike: day.main.feels_like,
              humidity: day.main.humidity,
              windSpeed: day.wind.speed,
              description: day.weather[0].description,
              imgId: day.weather[0].id,
            }));
          setResponseData({ weatherData: data, cityCountry: cityCountry });
          setLoading(false);
        });
      });
    } catch (err) {
      console.error('There was a problem: ', err);
    }
  };
  return [makeRequest, loading, responseData];
};

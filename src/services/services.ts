import { CityCountry, DayJson, WeatherData } from './types';

export const weatherApiCall = (
  url: string,
  setCityCountry: (a: CityCountry) => void,
  setWeatherData: (a: WeatherData[]) => void
) => {
  try {
    fetch(url).then((res) => {
      res
        .json()
        .then((json) => {
          setCityCountry({
            city: json.city.name,
            country: json.city.country,
          });
          return json.list
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
        })
        .then((data) => setWeatherData(data));
    });
  } catch (err) {
    console.error('There was a problem: ', err);
  }
};

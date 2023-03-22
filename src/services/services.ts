import { DayJson, ResponseData } from './types';

export const getWeatherData = async (
  url: string
): Promise<ResponseData | undefined> => {
  try {
    const resData = fetch(url).then((res) => {
      return res.json().then((json) => {
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

        return { weatherData: data, cityCountry: cityCountry };
      });
    });
    return resData;
  } catch (err) {
    console.error('There was a problem: ', err);
  }
  return;
};

import { useEffect, useState } from 'react';
import { DayCard } from './DayCard';
import { DegreeToggle } from './DegreeToggle';
import { WeatherData, dayJson } from './types';

export const ForecastContainer = () => {
  const [degreeTypeCelsius, setDegreeTypeCelsius] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const baseUrl = import.meta.env.VITE_WEATHER_URL;
  const degreeTypeName = `&units=${degreeTypeCelsius ? 'metric' : 'imperial'}`;
  const appId = `&appid=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    try {
      fetch(baseUrl + degreeTypeName + appId).then((res) => {
        if (res.ok) {
          res
            .json()
            .then((json) =>
              json.list
                .filter((day: dayJson) => {
                  console.log(day);
                  return day.dt_txt.includes('00:00:00');
                })
                .map((day: dayJson) => ({
                  date: day.dt,
                  temp: day.main.temp,
                  description: day.weather[0].description,
                  imgId: day.weather[0].id,
                }))
            )
            .then((data) => setWeatherData(data));
        }
      });
    } catch (err) {
      console.error('There was a problem: ', err);
    }
  }, [degreeTypeCelsius]);

  return (
    <div className='mx-auto p-2 max-w-7xl'>
      <h1 className='bg-teal-800 rounded-lg py-8 text-white font-semibold text-4xl text-center'>
        5-Day Forecast
      </h1>
      <div className='fixed bottom-6 right-4 justify-end'>
        <DegreeToggle
          degreeTypeCelsius={degreeTypeCelsius}
          setDegreeType={setDegreeTypeCelsius}
        />
      </div>
      <div className='flex flex-wrap justify-center'>
        {weatherData.map((data, index) => (
          <DayCard
            key={index}
            degreeTypeCelsius={degreeTypeCelsius}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { DayCard } from './DayCard';
import { DegreeToggle } from './DegreeToggle';
import { WeatherData, CityCountry, DayJson } from './types';
import { ZipCode } from './ZipCode';

export const ForecastContainer = () => {
  const [degreeTypeCelsius, setDegreeTypeCelsius] = useState<boolean>(false);
  const [zipCode, setZipCode] = useState<string>('76102');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [cityCountry, setCityCountry] = useState<CityCountry>({
    city: 'Fort Worth',
    country: 'US',
  });

  const baseUrl = import.meta.env.VITE_WEATHER_URL;
  const zip = `?zip=${zipCode}`;
  const degreeTypeName = `&units=${degreeTypeCelsius ? 'metric' : 'imperial'}`;
  const appId = `&appid=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    try {
      fetch(baseUrl + zip + degreeTypeName + appId).then((res) => {
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
  }, [degreeTypeCelsius, zipCode]);

  return (
    <div className='mx-auto p-2 max-w-7xl'>
      <h1 className='bg-teal-800 rounded-lg py-8 text-white font-semibold text-4xl text-center'>
        5-Day Forecast
      </h1>
      <h2 className='font-medium text-2xl text-center'>
        {cityCountry.city}, {cityCountry.country}
      </h2>
      <ZipCode setZipCode={setZipCode} />
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

import { useEffect, useState } from 'react';
import { DayCard } from './DayCard';
import { DegreeToggle } from './DegreeToggle';
import { WeatherData, CityCountry, DayJson } from '../services/types';
import { ZipCode } from './ZipCode';
import { weatherApiCall } from '../services/services';

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
    weatherApiCall(
      baseUrl + zip + degreeTypeName + appId,
      setCityCountry,
      setWeatherData
    );
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

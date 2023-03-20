import { useState } from 'react';
import { DayCard } from './DayCard';
import { DegreeToggle } from './DegreeToggle';

export const ForecastContainer = () => {
  const [degreeTypeCelsius, setDegreeTypeCelsius] = useState<boolean>(false);

  const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=76108`;
  const degreeTypeName = degreeTypeCelsius ? 'metric' : 'imperial';
  const API_KEY = 'abdaf1e18fe43e189848fa0e0514b7ae';

  const getWeatherData = async () => {
    const res = await fetch(
      baseUrl + '&units=' + degreeTypeName + '&appid=' + API_KEY
    );
    const data = await res.json();
    const current = data.list[0];
    const icon = current.weather[0].icon;
    console.log(icon);
  };

  return (
    <div>
      <h1>Forecast Container</h1>
      <DegreeToggle
        degreeTypeCelsius={degreeTypeCelsius}
        setDegreeType={setDegreeTypeCelsius}
      />
      <DayCard degreeTypeCelsius={degreeTypeCelsius} />
      <button className='bg-blue-600 p-2' onClick={() => getWeatherData()}>
        Get Weather Data
      </button>
    </div>
  );
};

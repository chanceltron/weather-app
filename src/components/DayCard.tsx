type IProps = { degreeTypeCelsius: boolean; data: WeatherData };
import moment from 'moment';
import type { WeatherData } from '../services/types';

export const DayCard = ({ data, degreeTypeCelsius }: IProps) => {
  const { date, temp, feelsLike, humidity, windSpeed, description, imgId } =
    data;

  const newDate = new Date();
  newDate.setTime(date * 1000);

  const icon = `owf owf-5x owf-${imgId}`;
  const degreeIndicator = degreeTypeCelsius ? ' °C' : ' °F';
  const speedIndicator = degreeTypeCelsius ? 'kph' : 'mph';

  return (
    <div className='flex flex-col items-center mx-auto px-8 py-6 rounded shadow-lg max-w-[240px]'>
      <h3 className='text-3xl font-semibold'>
        {moment(newDate).format('dddd')}
      </h3>
      <p className='text-lg font-medium'>
        {moment(newDate).format('MMMM Do, h:mm a')}
      </p>
      <i className={icon} />
      <h2 className='text-4xl font-semibold'>
        {`${Math.round(temp)} ${degreeIndicator}`}
      </h2>
      <div className='flex justify-between w-full'>
        <p>Feels like:</p>
        <p>{Math.round(feelsLike) + degreeIndicator}</p>
      </div>
      <div className='flex justify-between w-full'>
        <p>Humidity:</p>
        <p>{humidity}%</p>
      </div>
      <div className='flex justify-between w-full'>
        <p>Wind:</p>
        <p>{Math.round(windSpeed) + speedIndicator}</p>
      </div>
      <p className='capitalize mt-2'>{description}</p>
    </div>
  );
};

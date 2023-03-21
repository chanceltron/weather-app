export type WeatherData = {
  date: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  imgId: string;
};

export type CityCountry = {
  city: string;
  country: string;
};

export type DayJson = {
  clouds: {};
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];
  wind: { speed: number; deg: number; gust: number };
};

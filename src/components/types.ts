export type WeatherData = {
  date: number;
  temp: number;
  description: string;
  imgId: string;
};

export type dayJson = {
  clouds: {};
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
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

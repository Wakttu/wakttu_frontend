import WeatherSlide from '@/components/game/cloud/Weather';
import { useState } from 'react';
const Test = () => {
  const [weather, setWeather] = useState<string>();
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleWeather = (weather: string) => {
    setWeather(weather);
    setOpen(true);
    setTimeout(() => setOpen(false), 5000);
  };

  return (
    <>
      <button onClick={() => handleWeather('cloud')}>날씨 구름</button>
      <button onClick={() => handleWeather('wind')}>날씨 구름</button>
      <button onClick={() => handleWeather('fog')}>날씨 구름</button>
      <button onClick={() => handleWeather('segu')}>날씨 구름</button>

      <button onClick={() => setOpen(true)}>open</button>

      {isOpen && weather && <WeatherSlide weather={weather} />}
    </>
  );
};

export default Test;

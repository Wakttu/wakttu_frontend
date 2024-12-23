import { CInfo } from '@/components';
import { selectPause } from '@/redux/answer/answerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { socket } from '@/services/socket/socket';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Info = () => {
  const game = useSelector(selectGame);
  const timer = useSelector(selectTimer);
  const pause = useSelector(selectPause);
  const [weather, setWeather] = useState<string>();

  useEffect(() => {
    const handleWeatherInfo = (data: any) => {
      const { weather } = data;
      if (weather) {
        setWeather(weather);
      } else setWeather('cloud');
    };

    socket.on('cloud.round', handleWeatherInfo);

    return () => {
      socket.off('cloud.round', handleWeatherInfo);
    };
  }, []);

  return <CInfo timer={timer} game={game} weather={weather} pause={pause} />;
};
export default Info;

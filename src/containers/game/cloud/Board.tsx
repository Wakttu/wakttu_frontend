import { CBoard } from '@/components';
import { Cloud } from '@/components/game/cloud/Board';
import { selectPause } from '@/redux/answer/answerSlice';
import { selectGame } from '@/redux/game/gameSlice';
import { socket } from '@/services/socket/socket';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Board = () => {
  const game = useSelector(selectGame);
  const pause = useSelector(selectPause);
  const [data, setData] = useState<Cloud[]>([]);
  const [weather, setWeather] = useState<string>();

  useEffect(() => {
    if (game.round > 0 && game.cloud) {
      setData(game.cloud?.slice(20 * (game.round - 1), 20 * game.round));
    }
  }, [game.cloud, game.round]);

  useEffect(() => {
    const handleWeather = (data: any) => {
      const { weather } = data;
      if (weather) {
        setWeather(weather);
      } else setWeather('cloud');
    };

    socket.on('cloud.round', handleWeather);

    return () => {
      socket.off('cloud.round', handleWeather);
    };
  }, []);

  return <CBoard clouds={data} pause={pause} weather={weather} />;
};

export default Board;

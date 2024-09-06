import { LastPlayerList } from '@/components';
import { selectAnswer } from '@/redux/answer/answerSlice';
import { selectGame, selectReadyUser } from '@/redux/game/gameSlice';
import { socket } from '@/services/socket/socket';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface Bubble {
  user: any;
  chat: string;
}

const PlayerList = () => {
  const users = useSelector(selectReadyUser);
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const [bubble, setBubble] = useState<Bubble[]>([]);

  useEffect(() => {
    socket.on('chat', (data) => {
      setBubble([...bubble, data]);
    });

    return () => {
      socket.off('chat');
    };
  }, [bubble]);

  return (
    <LastPlayerList answer={answer} users={users} game={game} bubble={bubble} />
  );
};

export default PlayerList;

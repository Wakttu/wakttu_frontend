import { SPlayerList } from '@/components';
import { selectAnswer } from '@/redux/answer/answerSlice';
import {
  selectGame,
  selectReadyUser,
  selectTeam,
} from '@/redux/game/gameSlice';
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
  const team = useSelector(selectTeam);
  const [bubble, setBubble] = useState<Bubble[]>([]);

  useEffect(() => {
    const handleBubble = (data: any) => {
      setBubble([...bubble, data]);
    };

    socket.on('chat', (data) => {
      handleBubble(data);
    });

    return () => {
      socket.off('chat', handleBubble);
    };
  }, [bubble]);

  return (
    <SPlayerList
      answer={answer}
      users={users}
      game={game}
      bubble={bubble}
      team={team}
    />
  );
};

export default PlayerList;

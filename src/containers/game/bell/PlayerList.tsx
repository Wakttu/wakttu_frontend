import { BPlayerList } from '@/components';
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

export interface Emo {
  userId: string;
  roomId: string;
  emoticonId: string;
}

const PlayerList = () => {
  const users = useSelector(selectReadyUser);
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const team = useSelector(selectTeam);
  const [bubble, setBubble] = useState<Bubble[]>([]);
  const [receivedEmoticon, setReceivedEmoticon] = useState<Emo[]>([]);

  useEffect(() => {
    socket.on('chat', (data) => {
      console.log(data);
      setBubble([...bubble, data]);
    });
    return () => {
      socket.off('chat');
    };
  }, [bubble]);

  useEffect(() => {
    socket.on('emoticon', (data) => {
      setReceivedEmoticon([...receivedEmoticon, data]);
    });
    return () => {
      socket.off('emoticon');
    };
  }, [receivedEmoticon]);

  return (
    <BPlayerList
      answer={answer}
      users={users}
      game={game}
      bubble={bubble}
      team={team}
      emoticon={receivedEmoticon}
    />
  );
};

export default PlayerList;

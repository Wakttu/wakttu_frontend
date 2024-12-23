import { CPlayerList } from '@/components';
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
  const team = useSelector(selectTeam);
  const [bubble, setBubble] = useState<Bubble[]>([]);
  const [receivedEmoticon, setReceivedEmoticon] = useState<Emo[]>([]);

  useEffect(() => {
    const handleChatBubble = (data: any) => {
      setBubble((prev) => [...prev, data]); // 최신 상태를 안전하게 사용
    };

    socket.on('chat', handleChatBubble);

    return () => {
      socket.off('chat', handleChatBubble); // 특정 리스너만 제거
    };
  }, []);

  useEffect(() => {
    socket.on('emoticon', (data) => {
      setReceivedEmoticon([...receivedEmoticon, data]);
    });
    return () => {
      socket.off('emoticon');
    };
  }, [receivedEmoticon]);

  return (
    <CPlayerList
      users={users}
      bubble={bubble}
      team={team}
      emoticon={receivedEmoticon}
    />
  );
};

export default PlayerList;

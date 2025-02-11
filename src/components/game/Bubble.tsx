import { Bubble } from '@/styles/game/Bubble';
import { useEffect, useRef, useState } from 'react';

interface Props {
  chat: string;
}
const BubbleBox = ({ chat }: Props) => {
  const [data, setData] = useState('');
  let timeId = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    if (chat.trim() === '') return;
    if (timeId) clearTimeout(timeId.current);
    setData(chat);
    timeId.current = setTimeout(() => {
      setData('');
    }, 2000);
  }, [chat]);

  return <>{data !== '' ? <Bubble>{data}</Bubble> : ''}</>;
};

export default BubbleBox;

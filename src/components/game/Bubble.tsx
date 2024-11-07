import { Bubble } from '@/styles/game/Bubble';
import { useEffect, useRef, useState } from 'react';

interface Props {
  chat: string;
}
const BubbleBox = ({ chat }: Props) => {
  const [data, setData] = useState('');
  const [key, setKey] = useState(0);
  let timeId = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (chat.trim() === '') return;
    if (timeId) clearTimeout(timeId.current);
    setData(chat);
    setKey((prevKey) => prevKey + 1);
    timeId.current = setTimeout(() => {
      setData('');
    }, 2000);
  }, [chat]);

  return <>{data !== '' ? <Bubble key={key}>{data}</Bubble> : ''}</>;
};

export default BubbleBox;

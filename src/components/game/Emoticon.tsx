import { GEmoticon } from '@/components';
import { getEmoticonURL } from '@/services/api';
import { ImoticonImage } from '@/styles/game/Imoticon';
import { useEffect, useState } from 'react';

interface Props {
  emoticon?: string;
}

const Emoticon = ({ emoticon }: Props) => {
  const [receivedEmoticon, setEmoticon] = useState<string>();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (emoticon) {
      setEmoticon(emoticon);
      setKey((prev) => prev + 1);
      setTimeout(() => setEmoticon(undefined), 2000);
    }
  }, [emoticon]);

  return (
    <>
      {receivedEmoticon && (
        <ImoticonImage src={getEmoticonURL(receivedEmoticon)} alt="Emoticon" />
      )}
    </>
  );
};

export default Emoticon;

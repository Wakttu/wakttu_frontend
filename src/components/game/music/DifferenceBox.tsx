import { PlusScore } from '@/styles/bell/PlayerList';
import { useEffect, useRef, useState } from 'react';

interface Props {
  score: number;
}

const Difference = ({ score }: Props) => {
  const [data, setData] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const count = score - data;
    setDifference(count);
    setData(score);
  }, [score]);

  return (
    <>
      {difference !== 0 ? (
        <PlusScore key={data} plus={difference > 0}>
          {difference > 0 ? '+' : ''}
          {difference}
        </PlusScore>
      ) : (
        ''
      )}
    </>
  );
};

export default Difference;

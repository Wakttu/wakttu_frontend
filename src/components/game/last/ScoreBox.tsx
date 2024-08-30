import { useEffect, useRef, useState } from 'react';

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  const [data, setData] = useState(0);
  const ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let count = score - data;
    if (count === 0) return;
    ref.current = setInterval(() => {
      if (count <= 0) clearInterval(ref.current);
      setData((prev) => prev + 1);
      count -= 1;
    }, 50);

    return () => {
      clearInterval(ref.current);
    };
  }, [score]);

  return <>{data}</>;
};

export default Score;

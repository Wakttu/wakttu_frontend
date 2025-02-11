import { useEffect, useRef, useState } from 'react';

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  const [data, setData] = useState(0);
  const ref = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    let count = score - data;
    if (count === 0) return;
    else if (count > 0) {
      ref.current = setInterval(() => {
        if (count <= 0) clearInterval(ref.current);
        setData((prev) => prev + 1);
        count -= 1;
      }, 30);
    } else {
      ref.current = setInterval(() => {
        if (count >= 0) clearInterval(ref.current);
        setData((prev) => prev - 1);
        count += 1;
      }, 30);
    }

    return () => {
      clearInterval(ref.current);
    };
  }, [data, score]);

  return <>{data}</>;
};

export default Score;

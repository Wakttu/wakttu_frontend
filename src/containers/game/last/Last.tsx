import { Last as CLast } from '@/components';
import { selectAnswer } from '@/redux/answer/answerSlice';
import { selectGame, selectWhoisTurn, setGame } from '@/redux/game/gameSlice';
import { selectHistory } from '@/redux/history/historySlice';

import { useRef } from 'react';
import { useSelector } from 'react-redux';

const Last = () => {
  const whoIsTurn = useSelector(selectWhoisTurn);
  const game = useSelector(selectGame);
  const answer = useSelector(selectAnswer);
  const history = useSelector(selectHistory);

  const historyBoxRef = useRef<HTMLDivElement | null>(null);

  return (
    <CLast
      history={history}
      game={game}
      name={whoIsTurn}
      answer={answer}
      historyBoxRef={historyBoxRef}
    />
  );
};

export default Last;

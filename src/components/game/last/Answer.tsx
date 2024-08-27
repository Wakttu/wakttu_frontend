import { hangulTools } from '@/modules/Hangul';
import { selectPause } from '@/redux/answer/answerSlice';
import { selectTimer } from '@/redux/timer/timerSlice';
import { Game } from '@/services/socket/socket';
import {
  BTimerBar,
  Container,
  CTimer,
  GaugeBar,
  Modal,
  ModalTitle,
  TimerText,
  RemainText,
  TimerBar,
  TimerIcon,
  TargetText,
  CAnswer,
  AnswerText,
  TitleText,
} from '@/styles/last/Answer';
import { LeftTimer, RightTimer } from '@/styles/last/Info';
import { Answer as TypeAnswer } from '@/redux/answer/answerSlice';
import WordErrorEffect from './WordErrorEffect';

interface Props {
  chat: string;
  game: Game;
  timer: any;
  pause: boolean;
  answer: TypeAnswer;
}

const Answer = ({ chat, game, pause, timer, answer }: Props) => {
  const target = () => {
    const res = hangulTools().dueum(game.target);
    if (res !== game.target && res !== '') return `(${res})`;
    else return '';
  };
  return (
    <Container>
      <Modal>
        <ModalTitle>
          <TitleText>
            당신의 차례! 아래의 채팅 창에서 답을 입력하세요.
          </TitleText>
        </ModalTitle>
        <TargetText>
          {game.target}
          {target()}
        </TargetText>
        {answer.answer && <WordErrorEffect word={answer.answer} />}
        <CTimer>
          <LeftTimer>
            <TimerIcon src="/assets/game/timer.svg" />
            <TimerText>라운드 남은 시간</TimerText>
          </LeftTimer>
          <RightTimer>
            <RemainText>
              {((timer.roundTime - timer.countTime) / 1000.0).toFixed(1)}초
            </RemainText>
            <TimerBar>
              {pause ? (
                <GaugeBar key={game.target} gauge={timer.roundTime} />
              ) : (
                ''
              )}
            </TimerBar>
          </RightTimer>
        </CTimer>
        <CTimer>
          <LeftTimer>
            <TimerIcon src="/assets/game/timer.svg" />
            <TimerText>이번턴 남은 시간</TimerText>
          </LeftTimer>
          <RightTimer>
            <RemainText>
              {((timer.turnTime - timer.countTime) / 1000.0).toFixed(1)}초
            </RemainText>
            <BTimerBar>
              {pause ? (
                <GaugeBar key={game.target} gauge={timer.turnTime} />
              ) : (
                ''
              )}
            </BTimerBar>
          </RightTimer>
        </CTimer>
        <CAnswer>
          <AnswerText>{chat}</AnswerText>
        </CAnswer>
      </Modal>
    </Container>
  );
};

export default Answer;
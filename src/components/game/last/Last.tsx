import { hangulTools } from '@/modules/Hangul';
import { Game as Type } from '@/services/socket/socket';
import {
  Category,
  CCargo,
  CDesc,
  CMain,
  CTrain,
  CWord,
  CWordC,
  Desc,
  Left,
  Main,
  NameText,
  Right,
  SWheel,
  BWheel,
  WordText,
  Light,
  CLeft,
  MissionText,
  CRight,
  Logo,
} from '@/styles/last/Game';
import { RefObject } from 'react';
import WordErrorEffect from '../WordErrorEffect';
import WordEffect from '../WordEffect';
import { getR2URL } from '@/services/api';

interface Props {
  history: any[];
  game: Type;
  answer: any;
  name: string;
  historyBoxRef?: RefObject<HTMLDivElement | null>;
}

const Game = ({ history, game, answer, name, historyBoxRef }: Props) => {
  const target = () => {
    const res = hangulTools().dueum(game.target);
    if (res !== game.target && res !== '') return `(${res})`;
    else return '';
  };

  /** const scrollToBottom = useCallback(() => {
    if (historyBoxRef.current) {
      historyBoxRef.current.scrollTop = historyBoxRef.current.scrollHeight;
    }
  }, [historyBoxRef]);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);*/

  return (
    <CMain>
      <CLeft>
        <Left src={getR2URL('/assets/game/blinker.svg')} alt="신호등 아이콘" />
        <Light
          src={getR2URL('/assets/game/red.svg')}
          alt="신호등 빨간 불"
          top="4.6rem"
          onLight={answer.success === false}
        />
        <Light
          src={getR2URL('/assets/game/yellow.svg')}
          alt="신호등 노란 불"
          top="8.25rem"
          onLight={answer.success === undefined}
        />
        <Light
          src={getR2URL('/assets/game/green.svg')}
          alt="신호등 초록 불"
          top="11.8rem"
          onLight={answer.success}
        />
      </CLeft>

      <Main>
        <CTrain>
          <CWord>
            <Logo src={getR2URL('/assets/game/last-logo.svg')} alt="끝말잇기" />
          </CWord>
          <SWheel
            src={getR2URL('/assets/game/wheel.svg')}
            alt="움직이는 바퀴 아이콘"
            $rotate={answer.success === true}
          />
          <BWheel
            src={getR2URL('/assets/game/wheel.svg')}
            alt="정지된 바퀴 아이콘"
            left="9.8rem"
            $rotate={answer.success === true}
          />
          <BWheel
            src={getR2URL('/assets/game/wheel.svg')}
            alt="정지된 바퀴 아이콘"
            left="16.8rem"
            $rotate={answer.success === true}
          />
        </CTrain>
        <CCargo>
          <CWordC>
            <WordText>
              <WordEffect word={history[history.length - 1].id} />
            </WordText>
            <CDesc>
              <Category>{history[history.length - 1].type[0]}</Category>
              <Desc>{history[history.length - 1].mean}</Desc>
            </CDesc>
          </CWordC>
          <BWheel
            src={getR2URL('/assets/game/wheel.svg')}
            alt="정지된 바퀴 아이콘"
            left="1.2rem"
            $rotate={answer.success === true}
          />
          <BWheel
            src={getR2URL('/assets/game/wheel.svg')}
            alt="정지된 바퀴 아이콘"
            left="12.5rem"
            $rotate={answer.success === true}
          />
        </CCargo>
        <CCargo>
          <CWordC>
            <WordText>
              {answer.success === false ? (
                answer.pause === false ? (
                  <> {game.target}</>
                ) : (
                  <WordErrorEffect word={answer.answer} />
                )
              ) : (
                <>
                  {game.target}
                  {target()}
                </>
              )}
            </WordText>
            <CDesc>
              <NameText $name={true}>{name}</NameText>
              <NameText> 님의 차례!</NameText>
            </CDesc>
          </CWordC>
          <BWheel
            src={getR2URL('/assets/game/wheel.svg')}
            alt="정지된 바퀴 아이콘"
            left="1.2rem"
            $rotate={answer.success === true}
          />
          <BWheel
            src={getR2URL('/assets/game/wheel.svg')}
            alt="정지된 바퀴 아이콘"
            left="12.5rem"
            $rotate={answer.success === true}
          />
        </CCargo>
      </Main>
      <CRight>
        <Right src={getR2URL('/assets/game/mission.svg')} alt="미션 아이콘" />
        <MissionText>{game.mission}</MissionText>
      </CRight>
    </CMain>
  );
};

export default Game;

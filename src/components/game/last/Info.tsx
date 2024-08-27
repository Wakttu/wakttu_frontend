import { Game } from '@/services/socket/socket';
import {
  BChainText,
  BTimerBar,
  CChain,
  ChainText,
  CInfo,
  CRound,
  CTarget,
  CTargetList,
  CText,
  CTime,
  CTimer,
  GaugeBar,
  LeftTimer,
  NumberText,
  RemainText,
  RightTimer,
  RoundText,
  TargetRound,
  TimerBar,
  TimerIcon,
  TimerItem,
  TimerText,
  Wrapper,
} from '@/styles/last/Info';

interface Props {
  game: Game;
  pause: boolean;
  timer: any;
  keyword: string[];
}

const Info = ({ game, pause, timer, keyword }: Props) => {
  return (
    <Wrapper>
      <CChain $flag={true} />
      <CInfo>
        <CRound>
          <CTarget>
            <RoundText>Round</RoundText>
            <TargetRound>
              <NumberText>{game.round}</NumberText>
            </TargetRound>
          </CTarget>
          <CTargetList>
            {keyword.map((word: string, index: number) => {
              return (
                <RoundText key={index} $type={game.round - 1 === index}>
                  {word}
                </RoundText>
              );
            })}
          </CTargetList>
        </CRound>
        <CTime>
          <CTimer>
            <TimerItem>
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
            </TimerItem>
            <TimerItem>
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
            </TimerItem>
          </CTimer>
        </CTime>
      </CInfo>
      <CChain>
        <CText>
          <ChainText>CHAIN</ChainText>
          <BChainText>{game.chain}</BChainText>
        </CText>
      </CChain>
    </Wrapper>
  );
};

export default Info;
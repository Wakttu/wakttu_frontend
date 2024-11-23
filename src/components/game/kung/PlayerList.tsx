import {
  CName,
  CPlayer,
  CPlayerList,
  Host,
  Name,
  Score,
} from '@/styles/kung/PlayerList';
import { Game } from '@/services/socket/socket';
import { Answer } from '@/redux/answer/answerSlice';
import { ScoreBox } from '@/components';
import { Bubble } from '@/containers/game/last/PlayerList';
import BubbleBox from '../Bubble';
import Difference from './DifferenceBox';
import { TeamTag } from '@/styles/last/PlayList';
import Character from '@/components/common/Character';
import Emoticon from '@/containers/game/Emoticon';

interface Props {
  users: any;
  game: Game;
  answer: Answer;
  bubble: Bubble[];
  team: { woo: string[]; gomem: string[]; academy: string[]; isedol: string[] };
}

const PlayList = ({ users, game, answer, bubble, team }: Props) => {
  const checkMyTeam = (userId: string) => {
    const InWoo = team.woo.findIndex((id) => id === userId);
    const InGomem = team.gomem.findIndex((id) => id === userId);
    const InAcademy = team.academy.findIndex((id) => id === userId);
    const InIsedol = team.isedol.findIndex((id) => id === userId);
    if (InWoo !== -1) return { team: 'woo', name: '우왁굳' };
    else if (InGomem !== -1) return { team: 'gomem', name: '고멤' };
    else if (InAcademy !== -1) return { team: 'academy', name: '아카데미' };
    else if (InIsedol !== -1) return { team: 'isedol', name: '이세돌' };
    else return undefined;
  };
  return (
    <CPlayerList>
      {users.map((user: any, index: number) => {
        const myTeam = checkMyTeam(user.userId);
        const isTurn = game.turn === index;
        const isFail = isTurn && answer.success === false;

        const lastBubble = bubble.findLast(
          (item: Bubble) => item.user.id === user.userId
        );
        return (
          <CPlayer
            key={user.id}
            $turn={answer.pause && isTurn}
            $fail={isFail && answer.pause === true}
            $end={isFail}
          >
            {myTeam ? <TeamTag team={myTeam.team}>{myTeam.name}</TeamTag> : ''}
            {lastBubble ? <BubbleBox chat={lastBubble.chat} /> : ''}
            <Emoticon />
            <Character character={user.character} />
            <CName>
              {user.name === game.host && (
                <Host>
                  <span>방장</span>
                </Host>
              )}

              <Name>{user.name}</Name>
            </CName>
            <Difference score={user.score as number} />
            <Score team={myTeam ? myTeam.team : undefined}>
              <ScoreBox score={user.score as number} />
            </Score>
          </CPlayer>
        );
      })}
    </CPlayerList>
  );
};

export default PlayList;

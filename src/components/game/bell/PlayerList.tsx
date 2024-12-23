import {
  CName,
  CPlayer,
  CPlayerList,
  Host,
  Name,
  Score,
  TeamTag,
} from '@/styles/bell/PlayerList';
import { Game } from '@/services/socket/socket';
import { Answer } from '@/redux/answer/answerSlice';
import { ScoreBox } from '@/components';
import { Bubble } from '@/containers/game/last/PlayerList';
import BubbleBox from '../Bubble';
import Difference from './DifferenceBox';
import Character from '@/components/common/Character';
import { Emo } from '@/containers/game/bell/PlayerList';
import Emoticon from '@/components/game/Emoticon';
import { useRef } from 'react';

interface Props {
  users: any;
  game: Game;
  answer: Answer;
  bubble: Bubble[];
  emoticon: Emo[];
  team: { woo: string[]; gomem: string[]; academy: string[]; isedol: string[] };
}

const PlayList = ({ users, game, answer, bubble, team, emoticon }: Props) => {
  const checkMyTeam = (userId: string) => {
    const InWoo = team.woo.findIndex((id) => id === userId);
    const InGomem = team.gomem.findIndex((id) => id === userId);
    const InAcademy = team.academy.findIndex((id) => id === userId);
    const InIsedol = team.isedol.findIndex((id) => id === userId);
    if (InWoo !== -1) return { team: 'woo', name: '우왁굳' };
    else if (InGomem !== -1) return { team: 'gomem', name: '클래식' };
    else if (InAcademy !== -1) return { team: 'academy', name: '아카데미' };
    else if (InIsedol !== -1) return { team: 'isedol', name: '이세돌' };
    else return undefined;
  };

  const lastBubbleIdxRef = useRef<number | null>(null);

  return (
    <CPlayerList>
      {users.map((user: any, index: number) => {
        const myTeam = checkMyTeam(user.userId);

        const lastBubble = bubble.findLast((item: Bubble, index: number) => {
          if (item.user.id === user.userId) {
            lastBubbleIdxRef.current = index;
            return true;
          }
          return false;
        });

        let lastEmoIdx = -1;
        const lastEmo = emoticon.findLast((item: Emo, index: number) => {
          if (item.userId === user.userId) {
            lastEmoIdx = index;
            return true;
          }
          return false;
        });

        return (
          <CPlayer key={user.id} $success={user.success}>
            {myTeam ? <TeamTag team={myTeam.team}>{myTeam.name}</TeamTag> : ''}
            {lastBubble ? (
              <BubbleBox
                key={user.id + lastBubbleIdxRef}
                chat={lastBubble.chat}
              />
            ) : (
              ''
            )}
            {lastEmo ? (
              <Emoticon
                key={user.id + lastEmoIdx}
                emoticon={lastEmo.emoticonId}
              />
            ) : (
              ''
            )}
            <Character character={user.character} />

            <CName>
              {user.id === game.host && (
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

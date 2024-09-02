import {
  CName,
  CPlayer,
  CPlayerList,
  Host,
  Name,
  Score,
  Skin,
} from '@/styles/last/PlayList';
import { Game } from '@/services/socket/socket';
import { Answer } from '@/redux/answer/answerSlice';
import { ScoreBox } from '@/components';
import { getR2URL } from '@/services/api';

interface Props {
  users: any;
  game: Game;
  answer: Answer;
}

const PlayList = ({ users, game, answer }: Props) => {
  return (
    <CPlayerList>
      {users.map((user: any, index: number) => {
        const isTurn = game.turn === index;
        const isFail =
          isTurn && answer.success === false && answer.pause === true;
        return (
          <CPlayer key={user.id} $turn={answer.pause && isTurn} $fail={isFail}>
            <Skin src={getR2URL('/assets/ipali.png')} />
            <CName>
              {user.name === game.host && (
                <Host>
                  <span>방장</span>
                </Host>
              )}

              <Name>{user.name}</Name>
            </CName>
            <Score>
              <ScoreBox score={user.score as number} />
            </Score>
          </CPlayer>
        );
      })}
    </CPlayerList>
  );
};

export default PlayList;

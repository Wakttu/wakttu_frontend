import { getIcon } from '@/modules/UserInfo';
import { getR2URL } from '@/services/api';
import {
  CBody,
  CFooter,
  CLevel,
  CLevelIcon,
  CModal,
  Confirm,
  Container,
  CPlayer,
  CResult,
  CTitle,
  Exp,
  ExpBar,
  Gauge,
  Grade,
  Item,
  Name,
  NameTag,
  NowLevel,
  Rank,
  ResultTitle,
  Stat,
  StatText,
  TeamList,
  TeamName,
  TeamResult,
  TeamTag,
  Trophy,
  WinTeam,
  WinTeamList,
  WinTeamName,
} from '@/styles/room/ResultTeam';
import { Key, useEffect, useState } from 'react';
import Character from '../common/Character';

interface Props {
  user: any;
  list: Result[];
  offModal: () => void;
}

interface Result {
  rank: number;
  name: string;
  userId: string;
  score: number;
  provider?: string;
  exp: number;
  team?: string;
  character: any;
}

const ResultTeam = ({ list, offModal, user }: Props) => {
  const [team, setTeam] = useState<{ users: Result[]; rank: string[] }>();

  const check = (key: string) => {
    switch (key) {
      case 'woo':
        return '우왁굳';
      case 'isedol':
        return '이세돌';
      case 'gomem':
        return '고멤';
      case 'academy':
        return '아카데미';
      default:
        return '우왁굳';
    }
  };

  useEffect(() => {
    if (list.length > 0) {
      let teamName = list[0].team as string;

      const users = list.filter((user) => user.team === teamName);
      teamName = '';
      const teamList: string[] = [];

      for (let i = 0; i < list.length; i++) {
        if (list[i].team !== teamName) {
          teamName = list[i].team!;
          teamList.push(teamName!);
        }
      }

      const data: { users: Result[]; rank: string[] } = {
        users: users,
        rank: teamList,
      };

      setTeam(data);
    }
  }, [list]);

  return (
    <>
      {team && (
        <Container>
          <CModal>
            <CTitle>
              <Trophy src={getR2URL('/assets/icons/trophy.svg')} />
              <ResultTitle>게임 결과</ResultTitle>
            </CTitle>
            <CBody>
              <CResult>
                <WinTeam team={team.rank[0]}>
                  <WinTeamName>{check(team.rank[0])} 팀 </WinTeamName>
                  <WinTeamList>
                    {team.users.map((user: Result) => {
                      return (
                        <CPlayer key={user.userId}>
                          <Character character={user.character} />
                          <NameTag>
                            <Grade src={getIcon(user.exp, user.provider)} />
                            <Name>{user.name}</Name>
                          </NameTag>
                        </CPlayer>
                      );
                    })}
                  </WinTeamList>
                </WinTeam>
                <TeamList>
                  {team.rank.map((teamName, idx) => {
                    if (idx !== 0) {
                      return (
                        <TeamTag key={teamName} team={teamName}>
                          <TeamResult>
                            <Rank>{idx + 1}등 </Rank>
                            <TeamName>{check(teamName)} 팀</TeamName>
                          </TeamResult>
                        </TeamTag>
                      );
                    }
                  })}
                </TeamList>
              </CResult>
              <CFooter>
                <CLevel>
                  <CLevelIcon>
                    <NowLevel>
                      <Grade src={getIcon(user.score, user.provider)} />
                      <Exp>
                        +
                        {Math.ceil(
                          list.find((item) => item.userId === user.id)!.score /
                            10
                        )}
                        xp
                      </Exp>
                    </NowLevel>
                    <Grade src={getIcon(user.score + 1000, user.provider)} />
                  </CLevelIcon>
                  <ExpBar>
                    <Gauge exp={(user.score % 1000) / 10} />
                  </ExpBar>
                  <Stat>
                    <Item>
                      <StatText $color={true}>레벨</StatText>
                      <StatText $color={false}>
                        {Math.floor(user.score / 1000)}
                      </StatText>
                    </Item>
                    <Item>
                      <StatText $color={true}>경험치</StatText>
                      <StatText $color={false}>
                        {user.score % 1000}/1000
                      </StatText>
                    </Item>
                  </Stat>
                </CLevel>
                <Confirm onClick={offModal}>확인</Confirm>
              </CFooter>
            </CBody>
          </CModal>
        </Container>
      )}
    </>
  );
};

export default ResultTeam;

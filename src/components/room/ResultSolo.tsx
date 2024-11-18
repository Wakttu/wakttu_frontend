import { getIcon } from '@/modules/UserInfo';
import { getR2URL } from '@/services/api';
import {
  CBody,
  CModal,
  Container,
  CResult,
  CTitle,
  ResultTitle,
  Card,
  CPlayer,
  Name,
  NameTag,
  Rank,
  RankList,
  Score,
  Trophy,
  RestList,
  RestItem,
  RestText,
  CFooter,
  CLevel,
  CLevelIcon,
  NowLevel,
  Exp,
  ExpBar,
  Gauge,
  Grade,
  Stat,
  StatText,
  Item,
  Confirm,
} from '@/styles/room/ResultSolo';
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
  character: any;
  team?: string;
}

const ResultSolo = ({ list, offModal, user }: Props) => {
  return (
    <>
      {list.length > 0 && (
        <Container>
          <CModal>
            <CTitle>
              <Trophy src={getR2URL('/assets/icons/trophy.svg')} />
              <ResultTitle>게임 결과</ResultTitle>
            </CTitle>
            <CBody>
              <CResult>
                <RankList>
                  <CPlayer>
                    <Card rank={list.length > 1 ? list[1].rank : 2}>
                      <Character character={list[1].character} />
                      <NameTag>
                        <Grade src={getIcon(list[1].exp, list[1].provider)} />
                        <Name>{list.length > 1 ? list[1].name : ''}</Name>
                      </NameTag>
                      <Score rank={list.length > 1 ? list[1].rank : 2}>
                        {list.length > 1 ? list[1].score : 0}
                      </Score>
                      <Rank rank={list.length > 1 ? list[1].rank : 2}>
                        {list.length > 1 ? list[1].rank : 2}등
                      </Rank>
                    </Card>
                  </CPlayer>

                  <CPlayer>
                    <Card rank={1}>
                      <Character character={list[0].character} />
                      <NameTag>
                        <Grade src={getIcon(list[0].exp, list[0].provider)} />
                        <Name>{list[0].name}</Name>
                      </NameTag>
                      <Score rank={1}>{list[0].score}</Score>
                      <Rank rank={1}>1등</Rank>
                    </Card>
                  </CPlayer>
                  <CPlayer>
                    <Card rank={list.length > 2 ? list[2].rank : 3}>
                      {list.length > 2 && (
                        <>
                          <Character character={list[2].character} />
                          <NameTag>
                            <Grade
                              src={getIcon(list[2].exp, list[2].provider)}
                            />
                            <Name>{list.length > 2 ? list[2].name : ''}</Name>
                          </NameTag>
                          <Score rank={list.length > 2 ? list[2].rank : 3}>
                            {list.length > 2 ? list[2].score : 0}
                          </Score>
                          <Rank rank={list.length > 2 ? list[2].rank : 3}>
                            {list.length > 2 ? list[2].rank : 3}등
                          </Rank>
                        </>
                      )}
                    </Card>
                  </CPlayer>
                </RankList>
                <RestList>
                  {list.map((user, idx) => {
                    if (idx >= 3)
                      return (
                        <RestItem key={user.userId}>
                          <RestText>{user.rank}등</RestText>
                          <NameTag>
                            <Grade src={getIcon(user.exp, user.provider)} />
                            <Name>{user.name}</Name>
                          </NameTag>
                        </RestItem>
                      );
                  })}
                </RestList>
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

export default ResultSolo;

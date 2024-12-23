import { Ranks, User } from '@/containers/main/Ranking';
import { getIcon, getLevel } from '@/modules/UserInfo';
import {
  Wrapper,
  Title,
  Body,
  Button,
  Nav,
  Content,
  List,
  Item,
  Left,
  Rank,
  Right,
  Info,
  Grade,
  Name,
} from '@/styles/main/Ranking';
import { JSX, MouseEvent } from 'react';

interface Props {
  isClicked?: Ranks;
  users?: User[];
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Ranking = ({ isClicked, users, onClick }: Props) => {
  return (
    <Wrapper>
      <Title>형 왁뚜 랭킹 봤어?</Title>
      <Body>
        <Nav>
          <Button
            onClick={onClick}
            name={'userRanks'}
            isClicked={isClicked === 'userRanks'}
          >
            느그자
          </Button>
          <Button
            onClick={onClick}
            name={'wooRanks'}
            isClicked={isClicked === 'wooRanks'}
          >
            팬치
          </Button>
          <Button
            onClick={onClick}
            name={'ineRanks'}
            isClicked={isClicked === 'ineRanks'}
          >
            둘기
          </Button>
          <Button
            onClick={onClick}
            name={'jingRanks'}
            isClicked={isClicked === 'jingRanks'}
          >
            똥강아지
          </Button>
          <Button
            onClick={onClick}
            name={'lilRanks'}
            isClicked={isClicked === 'lilRanks'}
          >
            박쥐
          </Button>
          <Button
            onClick={onClick}
            name={'juRanks'}
            isClicked={isClicked === 'juRanks'}
          >
            주폭도
          </Button>
          <Button
            onClick={onClick}
            name={'goRanks'}
            isClicked={isClicked === 'goRanks'}
          >
            균냥단
          </Button>
          <Button
            onClick={onClick}
            name={'viRanks'}
            isClicked={isClicked === 'viRanks'}
          >
            라니
          </Button>
        </Nav>
        <Content>
          <List>
            {users
              ? users.map((data: User, idx: number) => {
                  return (
                    <Item key={data.user.name}>
                      <Left>
                        <Rank index={idx}>{idx + 1}위</Rank>
                        <Info>
                          <Grade src={getIcon(data.user.score)} />
                          <Name>{data.user.name}</Name>
                        </Info>
                      </Left>
                      <Right>
                        {isClicked === 'userRanks'
                          ? getLevel(data.user.score) + '렙'
                          : data.value + '회'}
                      </Right>
                    </Item>
                  );
                })
              : null}
          </List>
        </Content>
      </Body>
    </Wrapper>
  );
};

export default Ranking;

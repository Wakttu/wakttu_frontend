import { MouseEvent, useEffect, useState } from 'react';
import {
  GameStart,
  WrapForm,
  PlayerName,
  Rank,
  Wakgames,
  MainLogo,
  CLogin,
  GusetLogin,
  WakGamesLogin,
  GuestText,
  WakgamesText,
  SignUp,
  LeftText,
  RightText,
  RightArrow,
  CRight,
  CPLayer,
  Info,
  NameNRank,
  LevelBar,
  GaugeBar,
  Stat,
  GrayText,
  BlackText,
  CStart,
  CTop,
} from '@/styles/main/MainForm';

import { client, getR2URL } from '@/services/api';
import { getIcon, getUserDesc } from '@/modules/UserInfo';
import Character from '../common/Character';
import Router from 'next/router';
import Loading from '../common/Loading';

interface Props {
  user: any;
  isLogined: boolean;
  onModal: (e: MouseEvent<HTMLElement>) => void;
  start: (e: MouseEvent<HTMLElement>) => void;
  logout: (e: MouseEvent<HTMLElement>) => void;
}
const ENV = process.env.NEXT_PUBLIC_NODE_ENV;

const MainForm = ({ isLogined, onModal, logout, start, user }: Props) => {
  const [currentIcon, setCurrentIcon] = useState(getIcon(0));
  const [userInfo, setUserInfo] = useState(
    getUserDesc(user.score, user.provider)
  );
  const [character, setCharacter] = useState({
    skin: 'S-1',
    head: '',
    eye: '',
    hand: '',
  });

  useEffect(() => {
    const newIcon = getIcon(user.score as number, user.provider as any);
    setCurrentIcon(newIcon);
  }, [user.score, user.provider]);

  const waktaLogin = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const data = await client
      .get('auth/wakta')
      .then((response) => response.data)
      .catch((err) => alert('왁타버스 게임즈 연동 실패'));
    if (data) window.location.href = data.url;
  };

  const guestLogin = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const data = await client
      .get('auth/guest')
      .then((response) => response.data)
      .catch((err) => alert('게스트 로그인 실패'));
    if (data) Router.reload();
  };

  useEffect(() => {
    setUserInfo(getUserDesc(user.score, user.provider));
    setCharacter(user.character);
  }, [user]);

  return (
    <WrapForm>
      <MainLogo src={getR2URL('/logo.svg')} alt="왁뚜 로고" />

      {isLogined ? (
        <CStart>
          <CTop>
            <CPLayer>
              <Character
                character={character}
                style={{
                  transform: 'scale(0.8)',
                  left: '-3rem',
                }}
              />
              <Info>
                <NameNRank>
                  <Rank src={userInfo.icon} alt="플레이어 등급" />
                  <PlayerName> {user.name}</PlayerName>
                </NameNRank>
                <LevelBar>
                  <GaugeBar $exp={userInfo.exp / 10} />
                </LevelBar>
                <Stat>
                  <GrayText>레벨</GrayText>
                  <BlackText>{userInfo.level}</BlackText>
                  <GrayText>경험치</GrayText>
                  <BlackText>{userInfo.exp}/1000</BlackText>
                </Stat>
              </Info>
            </CPLayer>
            <GameStart onClick={start}>시작하기</GameStart>
          </CTop>
          <SignUp>
            <LeftText>배럭 돌리시게요?</LeftText>
            <CRight onClick={logout}>
              <RightText>로그아웃</RightText>
              <RightArrow
                src={getR2URL('/assets/icons/green-right-line.svg')}
                alt="오른쪽 화살표 아이콘"
              />
            </CRight>
          </SignUp>
        </CStart>
      ) : ENV === 'jogong' ? (
        <Loading />
      ) : (
        <CLogin>
          <GusetLogin onClick={guestLogin}>
            <GuestText>{'[형이봤] 형 게스트 만들어왔어'}</GuestText>
          </GusetLogin>
          <WakGamesLogin onClick={waktaLogin}>
            <Wakgames
              src={getR2URL('/assets/icons/wakgames.svg')}
              alt="왁타버스 게임즈 로고"
            />
            <WakgamesText>왁타버스 게임즈로 로그인</WakgamesText>
          </WakGamesLogin>
          <SignUp>
            <LeftText>이미 계정이 있으세요?</LeftText>
            <CRight onClick={onModal}>
              <RightText>왁뚜 계정으로 로그인</RightText>
              <RightArrow
                src={getR2URL('/assets/icons/green-right-line.svg')}
                alt="오른쪽 화살표 아이콘"
              />
            </CRight>
          </SignUp>
        </CLogin>
      )}
    </WrapForm>
  );
};

export default MainForm;

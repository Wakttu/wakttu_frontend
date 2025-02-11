import Head from 'next/head';

import { MainHeader } from '@/components';
import { getR2URL } from '@/services/api';
import { Container } from '@/styles/common/Layout';

import { styled } from 'goober';

const ScrollContainer = styled('div')`
  height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledImage = styled('img')`
  width: 100%;
  height: auto;
  display: block;
`;

const Intro = () => {
  return (
    <>
      <Head>
        <title>게임 소개 | 왁뚜 - 우리 모두 품어놀자!</title>
      </Head>

      <Container>
        <MainHeader />
        <ScrollContainer>
          <StyledImage src={getR2URL('/intro.png')} alt="게임 소개 이미지" />
        </ScrollContainer>
      </Container>
    </>
  );
};

export default Intro;

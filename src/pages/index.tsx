import Head from 'next/head';
import { useSelector } from 'react-redux';

import { MainHeader } from '@/components';
import Auth from '@/containers/auth/Auth';
import { selectModal } from '@/redux/modal/modalSlice';

import MainFormContainer from '@/containers/main/MainForm';
import { Container } from '@/styles/common/Layout';
import { Wrapper } from '@/styles/main/Layout';
import WakttuInfo from '@/components/main/Info';

const Main = () => {
  const modal = useSelector(selectModal);

  return (
    <>
      <Head>
        <title>왁뚜 - 우리 모두 품어놀자!</title>
      </Head>
    
      {modal.open ? (
        <Auth />
      ) : (
        <Container>
          <MainHeader />
          <Wrapper>
            <MainFormContainer />
          </Wrapper>
          <WakttuInfo />
        </Container>
      )}
    </>
  );
};

export default Main;

import { Info, CopyRight, Pdf, Flex } from '@/styles/main/Info';
import { useRouter } from 'next/router';

const WakttuInfo = () => {
  const router = useRouter();
  return (
    <Info>
      <>
        <CopyRight>© copyright WAKTTU.</CopyRight>
        <CopyRight>
          왁뚜는 왁타버스에서 제공하는 공식 콘텐츠가 아닙니다.
        </CopyRight>
        <Flex>
          <Pdf onClick={() => router.push('/Pdf')}>개인정보처리방침</Pdf>
          <CopyRight>문의 : admin@wakttu.kr</CopyRight>
        </Flex>
      </>
    </Info>
  );
};

export default WakttuInfo;

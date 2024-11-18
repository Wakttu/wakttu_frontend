import { Info, CopyRight, Pdf, Flex } from '@/styles/main/Info';
import { useRouter } from 'next/router';

const WakttuInfo = () => {
  const router = useRouter();
  return (
    <Info>
      <>
        <CopyRight>© 2024 WAKTTU</CopyRight>
        <CopyRight>
          왁뚜는 왁타버스에서 제공하는 공식 콘텐츠가 아닙니다.
        </CopyRight>
        <Flex>
          <Pdf onClick={() => window.open('/info/privacy', '_blank')}>
            개인정보 처리방침
          </Pdf>
          <Pdf onClick={() => window.open('/info/service', '_blank')}>
            서비스 이용약관
          </Pdf>

          <CopyRight onClick={() => location.href = 'mailto:admin@wakttu.kr'}>문의 : admin@wakttu.kr</CopyRight>
        </Flex>
      </>
    </Info>
  );
};

export default WakttuInfo;

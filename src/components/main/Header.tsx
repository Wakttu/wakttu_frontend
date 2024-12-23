import { WrapContent } from '@/styles/common/Header';
import { ScreenReaderOnly } from '@/styles/common/Accessibility';
import { MainHeaderBlock, MainHeaderLogo } from '@/styles/main/Header';
import { MainTab } from '@/components';
import { getR2URL } from '@/services/api';
import Link from 'next/link';

const Header = () => {
  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('업데이트 예정입니다.');
  };

  return (
    <MainHeaderBlock>
      <Link href="/" title="메인페이지로 이동">
        <ScreenReaderOnly>왁뚜</ScreenReaderOnly>
        <MainHeaderLogo
          src={getR2URL('/assets/icons/small-logo.svg')}
          alt="왁뚜 로고"
        />
      </Link>
      <WrapContent>
        <MainTab menuName="게임 소개" href="/main/intro" />
        <MainTab menuName="공지" onClick={handleComingSoon} />
        <MainTab menuName="업데이트" onClick={handleComingSoon} />
        <MainTab menuName="랭킹" href="/main/rank" />
        <MainTab menuName="크레딧" href="/main/credit" />
      </WrapContent>
    </MainHeaderBlock>
  );
};

export default Header;

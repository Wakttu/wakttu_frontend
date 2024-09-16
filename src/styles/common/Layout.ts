import { getR2URL } from '@/services/api';
import { R2_URL } from '@/services/api';
import styled from 'styled-components';

const ContentContainer = styled.div<{ path?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.875rem 0;

  gap: 1.4375rem;
  ${({ path }) => {
    if (path === '/')
      return `height: 100vh;
  background: url('${R2_URL}/assets/background.png') lightgray 50% / cover no-repeat;
`;
    else if (path?.includes('/last'))
      return `height: 100vh;
    background-color : lightgray;
    background-image :  url('${R2_URL}/assets/mypage-background.png') ,linear-gradient(180deg, #E4CEFF 0%, #AAF0FF 100%);
    background-size: 50%;
    background-repeat: repeat;
    padding-bottom:0;
    `;
    else if (path?.includes('/kung'))
      return `height: 100vh; background: linear-gradient(180deg, #C3FFB4 0%, #C3FFB4 100%);  padding-bottom:0;`;
  }}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 88rem;
  height: 67.5rem;

  gap: 1rem;
`;

export { ContentContainer, Container };

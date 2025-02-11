import { styled, keyframes } from 'goober';
import { COLORS, FONT_SIZES } from '../theme';
import { getR2URL, R2_URL } from '@/services/api';

const DROM_SHADOW = '0px 1px 10px 0px rgba(0, 0, 0, 0.15)';

const BAN = [
  '#FF1313',
  '#0904FF',
  '#AC06BA',
  '#FFEC44',
  '#44FF57',
  '#000000',
  '#ffffff',
  '#8DFFF1',
];

export const CKung = styled('div')`
  display: flex;
  height: 32rem;
  padding: 0.625rem 2.5rem;
  justify-content: center;
  align-items: center;
`;

export const Left = styled('div')`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 28.625rem;
  height: 25.0625rem;
`;

export const Right = styled('div')`
  position: relative;
  display: flex;
  width: 33.25rem;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.9375rem 3.125rem;
  flex-wrap: wrap;
`;

export const Speaker = styled('img')<{ reverse: boolean }>`
  position: absolute;
  top: 0;
  ${({ reverse }) => (reverse ? 'right:0' : 'left:0')};
  width: 3.5625rem;
  height: 3.875rem;
  flex-shrink: 0;
`;

export const Tv = styled('div')`
  display: flex;
  justify-content: center;
  padding-top: 1.1rem;
  width: 22.35513rem;
  height: 21.875rem;
  flex-shrink: 0;

  background-image: url(${getR2URL('/assets/game/tv.svg')});
  background-size: cover;
`;

export const Logo = styled('img')`
  width: 20.6875rem;
  height: 12.25rem;
`;

export const PauseTv = styled('img')`
  width: 20.625rem;
  height: 12.25rem;
`;

export const Board = styled('div')`
  display: flex;
  width: 46rem;
  height: 24.5625rem;
  padding: 1.3125rem 0.75rem;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;

  background-image: url(${getR2URL('/assets/game/board.svg')});
  background-size: cover;
`;

export const Info = styled('div')`
  display: flex;
  width: 46rem;
  height: 5.125rem;
  padding: 0.4375rem 0rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const Object = styled('div')`
  display: flex;
  width: 7.375rem;
  height: 2.8125rem;
  padding: 0.125rem 0.625rem;
  margin-left: 3.84rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;

  border-radius: 0.3125rem;
  background: linear-gradient(0deg, #a4ff95 0%, #edff7e 100%);
`;

export const Pen = styled('img')`
  width: 1.4375rem;
  height: 1.4375rem;
  flex-shrink: 0;
`;

export const ObjectText = styled('h5')`
  color: ${COLORS.text};
  text-align: right;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const Round = styled('div')`
  display: flex;
  height: 3rem;
  padding: 0rem 0.0625rem;
  align-items: center;
  gap: 0.3125rem;
  flex-shrink: 0;

  border-bottom: 1px solid #fff;
`;

export const RoundText = styled('h3')<{ target?: boolean }>`
  color: ${({ target }) => (target ? '#ffffff' : '#ffffff99')};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const ChainText = styled('h4')`
  color: rgba(155, 255, 119, 0.8);
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-right: 3.84rem;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const Main = styled('div')`
  display: flex;
  height: 8.1875rem;
  padding: 0rem 6.9375rem;
  justify-content: center;
  align-items: center;
  gap: 1.1875rem;
  flex-shrink: 0;
`;

export const History = styled('div')`
  display: flex;
  width: 13.4375rem;
  height: 8rem;
  padding: 1.25rem 0.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5625rem;
  flex-shrink: 0;
`;

export const HistroyText = styled('h3')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.375rem;

  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const Desc = styled('div')`
  display: flex;
  height: 2.25rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
  flex-shrink: 0;
`;

export const LeftDesc = styled('div')`
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  color: ${COLORS.bg};
  text-align: center;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  border-radius: 12.5rem;
  background: #a377ff;
`;

export const RightDesc = styled('span')`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 11.75rem;

  overflow: hidden;
  color: ${COLORS.bg};
  text-overflow: ellipsis;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES.caption};
`;

export const Turn = styled('div')`
  position: relative;

  display: flex;
  width: 14.4375rem;
  height: 8rem;
  padding: 1.1875rem 0.1875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
`;

export const Target = styled('h3')`
  position: relative;
  width: 100%;
  height: 2.2rem;
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
`;

export const Typing = styled('div')`
  display: flex;
  height: 1.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
  align-self: stretch;
`;

export const Name = styled('span')`
  color: #9bff77;
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

export const TypingText = styled('span')`
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: ${FONT_SIZES['subtitle-1']};
`;

export const Frame = styled('img')`
  width: 6.75rem;
  height: 4.9375rem;
  flex-shrink: 0;
`;

export const CPost = styled('div')`
  display: flex;
  width: 33.25rem;
  padding: 0.8125rem 0.9375rem 0.5rem 0.9375rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 0.3125rem;
  border: 1px solid #7a2e04;
  background: #b25a08;
`;

export const Post = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 31.375rem;
  height: 17rem;
  flex-shrink: 0;

  background-image: url(${getR2URL('/assets/game/post.svg')});
  fill: linear-gradient(180deg, #00c944 -1.1%, #006322 98.9%);
`;

export const CPostTitle = styled('div')`
  display: flex;
  width: 31.375rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const PostTitle = styled('h6')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.3125rem;
  height: 1.8125rem;
  flex-shrink: 0;

  color: ${COLORS.text};

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  border-radius: 0.3125rem;
  background: #fb5e3c;
`;

export const CList = styled('div')`
  display: flex;
  width: 31.375rem;
  height: 13.6875rem;
  padding: 0.3125rem 2.0625rem;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 4.25rem;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

export const Emergency = styled('img')`
  width: 13.8125rem;
  height: 9.6875rem;
`;

export const CTimer = styled('div')`
  display: flex;
  width: 34.25rem;
  height: 3.5rem;
  padding: 0.375rem 1.5625rem;
  flex-direction: column;
  align-items: center;
`;

export const TimerItem = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LeftTimer = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const RightTimer = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const TimerIcon = styled('img')`
  width: 1.5rem;
  height: 1.5rem;
`;

export const TimerText = styled('span')`
  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

export const RemainText = styled('span')<{ color: boolean }>`
  color: ${({ color }) => (color ? '#FF4B4B' : '#FCFF62')};
  text-align: right;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 500;
  font-size: ${FONT_SIZES['body-2']};
`;

export const TimerBar = styled('div')`
  display: flex;
  width: 19.25rem;
  height: 0.625rem;

  align-items: center;

  border-radius: 6.25rem;
  background: #dbdbdb;

  box-shadow: ${DROM_SHADOW};
`;

export const BTimerBar = styled(TimerBar)`
  background: #605774;
`;

const TimerAnimation = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

export const GaugeBar = styled('div')<{
  gauge: number;
  pause: boolean;
  color: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: 6.25rem;
  background: ${({ color }) => (color ? '#FF4B4B' : '#FCFF62')};
  transform-origin: left;
  will-change: transform;

  animation: ${({ pause }) => (pause ? TimerAnimation : 'none')}
    ${({ gauge }) => gauge * 1.1}ms linear;
  animation-play-state: ${({ pause }) => (pause ? 'running' : 'paused')};
  animation-fill-mode: forwards;
`;

import { COLORS } from '@/styles/theme';
import { styled } from 'goober';

const CReady = styled('article')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 25rem;
  padding: 3rem 2rem;
  gap: 1.5rem;

  border-radius: 1rem;
  border: 2px solid ${COLORS['gray-4']};
  background: ${COLORS.bg};
`;
const CTeam = styled('div')`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

const TeamButton = styled('h4')<{ team: string }>`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;

  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ team }) => {
    switch (team) {
      case 'woo': {
        return COLORS.blue;
      }
      case 'gomem': {
        return COLORS.red;
      }
      case 'academy': {
        return COLORS.yellow;
      }
      case 'isedol': {
        return COLORS.green;
      }
    }
  }};
  color: rgba(0, 0, 0, 0.5);
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;

  cursor: pointer;
`;
const ReadyButton = styled('h4')`
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  border-radius: 1rem;
  border: none;
  background: ${COLORS.primary};

  color: ${COLORS.bg};
  text-align: center;

  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;

  cursor: pointer;

  &:hover {
    background: ${COLORS['primary-hov']};
  }
`;

export { CReady, ReadyButton, CTeam, TeamButton };

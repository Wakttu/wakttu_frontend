import { styled } from 'goober';
import { COLORS } from '@/styles/theme';

const WrapRoomNumber = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.625rem;
  padding: 0.25rem 0.625rem;

  border-radius: 0.5rem;
  background: ${COLORS['gray-4']};
`;

const RoomNum = styled('span')`
  font-size: 0.875rem;
  font-weight: 600;

  color: ${COLORS['gray-3']};
`;

export { WrapRoomNumber, RoomNum };

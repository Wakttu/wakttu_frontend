import { styled } from 'goober';

const ContentContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.875rem 0;

  gap: 1.4375rem;
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;

  width: 88rem;
  height: 67.5rem;

  gap: 1rem;
`;

export { ContentContainer, Container };

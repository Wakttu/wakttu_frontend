import { styled } from 'goober';

const ContainerMain = styled('div')`
  height: 100vh;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ContainerSub = styled('div')`
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ContainerTop = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;
  flex-shrink: 0;

  padding: 3rem 32.5rem 0rem 32.5rem;
`;

const ContainerBottom = styled('div')`
  display: flex;
  width: 100%;
  padding: 3rem 0.625rem 0rem 0.625rem;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  flex: 1 0 0;
  flex-grow: 1;
  background: var(--Gray-5, #f7f7f7);
`;

const ContainerContent = styled('div')`
  display: flex;
  width: 65.9375rem;
  height: 21.8125rem;
  padding: 0.625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
  flex-shrink: 0;
`;

export {
  ContainerMain,
  ContainerSub,
  ContainerTop,
  ContainerBottom,
  ContainerContent,
};

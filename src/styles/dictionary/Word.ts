import { styled, css } from 'goober';
import { COLORS } from '@/styles/theme';
import { relevantInfo, RelevantPerson } from '@/components/dictionary/Word';

const ListWrapper = styled('div')`
  display: flex;
  width: 120rem;
  height: 55rem;
  padding: 1rem 23.75rem 3rem 23.75rem;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;
  flex-shrink: 0;

  overflow-y: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled('div')`
  display: flex;
  width: 64.5rem;
  padding: 2.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  border-radius: 1rem;
  background: ${COLORS.bg};

  /* Drom_shadow */
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
`;

const TopWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const TopLeftWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Title = styled('h3')`
  color: #000;
  text-align: center;
`;

const LinkButton = styled('button')`
  background: none;
  border: none;
  cursor: pointer;
`;

const LinkIcon = styled('img')`
  width: 2rem;
  height: 2rem;
  transform: rotate(-90deg);
`;

/** Relevant */
const RelevantWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RelevantBackgroundColor = css<{ $RelevantPerson: RelevantPerson }>`
  ${({ $RelevantPerson }) => {
    return css`
      background-color: ${relevantInfo[$RelevantPerson].backgroundColor};
      color: ${relevantInfo[$RelevantPerson].color};
    `;
  }}
`;

const RelevantBdage = styled('div')<{ $RelevantPerson: RelevantPerson }>`
  display: flex;
  padding: 0.375rem 0.75rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.875rem;

  ${RelevantBackgroundColor};
`;

const RelevantText = styled('span')`
  color: rgba(255, 255, 255, 0.9);
  text-align: center;

  /* Body-1 - 16px - Medium */
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Description = styled('h6')`
  color: var(--Text, #282828);
`;

const TagWrapper = styled('div')`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 2.25rem;
  background: var(--Gray-4, #eaeaea);
`;

const TagContent = styled('span')`
  color: var(--Gray-2, #666);
  text-align: center;
`;

export {
  ListWrapper,
  Wrapper,
  TopWrapper,
  TopLeftWrapper,
  Title,
  RelevantWrapper,
  RelevantBdage,
  RelevantText,
  Description,
  TagWrapper,
  TagContent,
  LinkButton,
  LinkIcon,
};

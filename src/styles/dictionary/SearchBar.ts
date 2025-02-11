import { styled } from 'goober';

const Wrapper = styled('div')`
  display: flex;
  width: 52.625rem;
  margin: 3rem 0;

  padding: 0.625rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  border-radius: 1.875rem;
  border: 2px solid var(--Primary, #00bfa3);
`;

const Input = styled('input')`
  width: 47.8125rem;
  flex-shrink: 0;

  color: #000;

  border: none;

  background: none;

  /* H5 - 20px - SemiBold */
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled('button')`
  display: flex;
  width: 2.125rem;
  height: 2.125rem;
  padding: 0.5rem;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const SearchIcon = styled('img')`
  width: 1.19425rem;
  height: 1.19431rem;
  flex-shrink: 0;

  fill: var(--Primary, #00bfa3);
`;

export { Wrapper, Input, SearchButton, SearchIcon };

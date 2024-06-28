import { createGlobalStyle } from 'styled-components';
import { COLORS } from './theme';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: WantedSans-Medium;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('WantedSans-Medium'),
      url('/media/WantedSans-Medium.woff2') format('woff2');
  }

  @font-face {
    font-family: WantedSans-Regular;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('WantedSans-Regular'),
      url('/media/WantedSans-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: WantedSans-SemiBold;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('WantedSans-SemiBold'),
      url('/media/WantedSans-SemiBold.woff2') format('woff2');
  }

  @font-face {
    font-family: WantedSans-Bold;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('WantedSans-Bold'),
      url('/media/WantedSans-Bold.woff2') format('woff2');
  }

  @font-face {
    font-family: WantedSans-Black;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('WantedSans-Black'),
      url('/media/WantedSans-Black.woff2') format('woff2');
  }

  @font-face {
    font-family: WantedSans-ExtraBold;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('WantedSans-ExtraBold'),
      url('/media/WantedSans-ExtraBold.woff2') format('woff2');
  }

  @font-face {
    font-family: WantedSans-ExtraBlack;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('WantedSans-ExtraBlack'),
      url('/media/WantedSans-ExtraBlack.woff2') format('woff2');
  }

  #__next,
  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none; */
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  span {
    color: ${COLORS.text};
    font-family: 'Wanted Sans';
    font-style: normal;
    line-height: normal;
  }

  h1,
  h2 {
    font-weight: 700;
  }

  h3,
  h4,
  h5 {
    font-weight: 600;
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1.125rem;
    font-weight: 500;
  }

  ul,
  li {
    padding: 0;
    margin: 0;

    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

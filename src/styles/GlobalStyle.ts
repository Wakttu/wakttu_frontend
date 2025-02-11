import { createGlobalStyle } from 'styled-components';
import { COLORS } from './theme';

export const GlobalStyleForPdf = createGlobalStyle`
  #__next,
  body,
  html {
    margin: 0;
    padding: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  #__next,
  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none; 
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  span {
    color: ${COLORS.text};
    font-family: "Wanted Sans Variable", "Wanted Sans", sans-serif;

    font-style: normal;
    line-height: normal;
    font-weight: 400;

    margin: 0;
    padding: 0;
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

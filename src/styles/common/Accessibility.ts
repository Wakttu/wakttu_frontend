import styled from 'styled-components';

const ScreenReaderOnly = styled.span`
    position: absolute;
    border: 0;

    width: 1px;
    height: 1px;

    padding: 0;
    margin: -1px;

    overflow: hidden;
    clip: rect(0, 0, 0, 0);
`;

export { ScreenReaderOnly };
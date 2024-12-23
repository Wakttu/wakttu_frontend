import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

export const Content = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  position: relative;
  width: 80%;
  max-width: 31.25rem;
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-family: 'Wanted Sans Variable', sans-serif;
  font-size: 1.5rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const HelpContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const HelpItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const HelpNumber = styled.span`
  font-weight: bold;
  color: #007bff;
  min-width: 1.5rem;
`;

export const HelpText = styled.span`
  flex: 1;
  line-height: 1.5;
`;

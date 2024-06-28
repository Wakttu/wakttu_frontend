import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 25rem;

  padding: 1.25rem 0;

  border-radius: 1.25rem;
  box-shadow:
    0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.1),
    0 0.75rem 0.75rem 0 rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const FormItem = styled.input`
  box-sizing: border-box;

  width: 18.75rem;
  padding: 1rem;

  border: 0.06rem solid #5f5f5f;
  border-radius: 1.25rem;

  outline: none;
`;

const LoginButton = styled.button`
  box-sizing: border-box;

  width: 18.75rem;
  padding: 1rem;

  border: 0.06rem solid #5f5f5f;
  border-radius: 1.25rem;

  outline: none;

  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #000;

    transition: 0.5s;
  }
`;

export { FormContainer, FormSection, ButtonWrapper, FormItem, LoginButton };

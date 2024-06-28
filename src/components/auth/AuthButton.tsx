import { ButtonWrapper, LoginButton } from '@/styles/modules/AuthForm';

interface Props {
  buttonText?: string;
}

const AuthButton = ({ buttonText = '회원가입' }: Props) => {
  return (
    <ButtonWrapper>
      <LoginButton>{buttonText}</LoginButton>
    </ButtonWrapper>
  );
};

export default AuthButton;

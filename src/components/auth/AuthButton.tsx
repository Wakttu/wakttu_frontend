import authForm from '@/styles/modules/authForm.module.css';

interface Props {
  buttonText?: string;
}

const AuthButton = ({ buttonText = '회원가입' }: Props) => {
  return (
    <div className={authForm.buttonWrapper}>
      <button className={authForm.authButton}>{buttonText}</button>
    </div>
  );
};

export default AuthButton;

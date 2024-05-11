import authForm from '@/styles/modules/authForm.module.css';

interface Props {
  children: React.ReactNode;
  formTitle?: string;
}

const AuthForm = ({ children, formTitle = '회원가입' }: Props) => {
  return (
    <div className={authForm.formContainer}>
      <h1>{formTitle}</h1>
      <form className={authForm.formSection}>{children}</form>
    </div>
  );
};

export default AuthForm;

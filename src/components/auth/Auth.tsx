import { useState } from 'react';
import { TemporaryLayout, AuthForm, AuthInput, AuthButton } from '@/components/index';

const Auth = () => {
  const [toggleButton, setToggleButton] = useState('로그인하기');

  const handleToggleButton = () => {
    setToggleButton((current) => (current === '로그인하기' ? '회원가입하기' : '로그인하기'));
  };

  return (
    <TemporaryLayout>
      {toggleButton === '로그인하기' ? (
        <AuthForm>
          <AuthInput placeholderText="아이디" />
          <AuthInput placeholderText="닉네임" />
          <AuthInput placeholderText="비밀번호" />
          <AuthInput placeholderText="비밀번호 확인" />
          <AuthButton />
        </AuthForm>
      ) : (
        <AuthForm formTitle="로그인">
          <AuthInput placeholderText="아이디" />
          <AuthInput placeholderText="비밀번호" />
          <AuthButton buttonText="로그인" />
        </AuthForm>
      )}
      <button onClick={handleToggleButton}>{toggleButton}</button>
    </TemporaryLayout>
  );
};

export default Auth;

import { useState } from 'react';
import { TemporaryLayout, AuthForm, AuthInput, AuthButton } from '@/components/index';

const Auth = () => {
  const buttonLabels: string[] = ['로그인하기', '회원가입하기'];
  const [toggleButton, setToggleButton] = useState(buttonLabels[0]);

  const handleToggleButton = (label: string) => {
    const nextLabel = label === buttonLabels[0] ? buttonLabels[1] : buttonLabels[0];
    setToggleButton(nextLabel);
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
      <button onClick={() => handleToggleButton(toggleButton)}>{toggleButton}</button>
    </TemporaryLayout>
  );
};

export default Auth;

import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

import useInput from '@/hooks/useInput';
import { API_URL } from '@/services/api';
import { ERROR_MESSAGE } from '@/constants/auth';
import { AuthForm, AuthInput, AuthButton } from '@/components/index';
import { isExistError, isIdValidError } from '@/containers/auth/checkAuth';

interface InputProps {
  id: string;
  pw: string;
}

interface ErrorProps {
  message: string;
  type: string;
}

const SignIn = () => {
  const [errors, setErrors] = useState<ErrorProps>();

  const { inputs, onInputChange } = useInput<InputProps>({
    id: '',
    pw: '',
  });

  const { id, pw } = inputs;

  const isIdValid = async (userId: string) => {
    let sameId = true;

    try {
      const { data } = await axios.post(`${API_URL}/auth/check/id`, { id: userId });
      sameId = data.success;
    } catch (error) {
      if (axios.isAxiosError(error)) sameId = error?.response?.data.success;
    }

    return sameId;
  };

  const onSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const idValid = await isIdValid(id);

    if (isExistError(id, pw)) {
      setErrors(isExistError(id, pw));
      return;
    }

    if (isIdValidError(idValid)) {
      setErrors(isIdValidError(idValid));
      return;
    }

    const userInfo = {
      email: id,
      password: pw,
    };

    await axios
      .post(`${API_URL}/auth/login`, userInfo)
      .then((response) => {
        if (response.status === 201) {
          setErrors({ message: '', type: 'success' });
          console.log('로그인 완료!');
        }
      })
      .catch((error) => {
        setErrors({
          message: ERROR_MESSAGE.signInError,
          type: 'pw',
        });

        console.error(`로그인을 완료할 수 없습니다. ${error}`);
      });
  };

  return (
    <AuthForm formTitle="로그인" onSubmit={onSignInSubmit}>
      <AuthInput type="text" placeholder="아이디" name="id" value={id} onChange={onInputChange} />
      <AuthInput
        type="password"
        placeholder="비밀번호"
        name="pw"
        value={pw}
        onChange={onInputChange}
      />
      {errors && <span>{errors.message}</span>}
      <AuthButton buttonText="로그인" />
    </AuthForm>
  );
};

export default SignIn;

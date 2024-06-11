import axios from 'axios';
import { FormEvent, useState } from 'react';

import useInput from '@/hooks/useInput';
import { API_URL, SOCKET } from '@/services/api';
import { ERROR_MESSAGE } from '@/constants/auth';
import { AuthForm, AuthInput, AuthButton } from '@/components/index';
import { isExistError, isIdValidError } from '@/containers/auth/checkAuth';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setUserId } from '@/redux/user/userSlice';
import { useCookies } from 'react-cookie';

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
      if (axios.isAxiosError(error)) sameId = error.response?.data.success;
    }

    return sameId;
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['ACCOUNT_TOKEN']);

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
          dispatch(setUserId(response.data.id));

          SOCKET.on('connect', () => {
            router.push('/roomlist');
            console.log('서버와 연결되었습니다.');
          });
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

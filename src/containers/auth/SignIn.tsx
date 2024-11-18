import axios from 'axios';
import { FormEvent, MouseEvent, useState } from 'react';

import useInput from '@/hooks/useInput';
import { API_URL, client } from '@/services/api';
import { ERROR_MESSAGE } from '@/constants/auth';
import { AuthForm, AuthInput } from '@/components/index';
import { isExistError, isIdValidError } from '@/containers/auth/checkAuth';

import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/user/userSlice';
import { closeModal } from '@/redux/modal/modalSlice';
import { socket } from '@/services/socket/socket';

interface InputProps {
  id: string;
  pw: string;
}

interface ErrorProps {
  message: string;
  type: string;
}

interface Props {
  onToggle: (e: MouseEvent<HTMLElement>) => void;
}

const SignIn = ({ onToggle }: Props) => {
  const [errors, setErrors] = useState<ErrorProps>();

  const { inputs, onInputChange } = useInput<InputProps>({
    id: '',
    pw: '',
  });

  const { id, pw } = inputs;

  const isIdValid = async (userId: string) => {
    let sameId = true;

    try {
      const { data } = await axios.post(
        `${API_URL}/auth/check/id`,
        {
          id: userId,
        },
        { withCredentials: true }
      );
      sameId = data.success;
    } catch (error) {
      if (axios.isAxiosError(error)) sameId = error.response?.data.success;
    }
    return sameId;
  };

  const dispatch = useDispatch();

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
    await client
      .post('auth/login', userInfo)
      .then((response) => {
        if (response.status === 201) {
          setErrors({ message: '', type: 'success' });
          dispatch(setUserInfo(response.data));
          dispatch(closeModal());
          socket.connect();
        }
      })
      .catch((error) => {
        setErrors({
          message: ERROR_MESSAGE.signInError,
          type: 'pw',
        });
        console.error(`로그인을 완료할 수 없습니다. ${error}`);
        return;
      });
  };

  const waktaLogin = async () => {
    const { data } = await client.get('auth/wakta');
    window.location.href = data.url;
  };

  return (
    <AuthForm
      formTitle="로그인"
      onSubmit={onSignInSubmit}
      onToggle={onToggle}
      onAuth={waktaLogin}
    >
      <AuthInput
        label="아이디"
        type="text"
        placeholder="아이디 입력"
        name="id"
        value={id}
        onChange={onInputChange}
      />
      <AuthInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        name="pw"
        value={pw}
        onChange={onInputChange}
      />
      {errors && <p>{errors.message}</p>}
    </AuthForm>
  );
};

export default SignIn;

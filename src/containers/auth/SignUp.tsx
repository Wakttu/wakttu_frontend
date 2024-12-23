import axios from 'axios';
import { useState, FormEvent, MouseEvent } from 'react';

import useInput from '@/hooks/useInput';
import { API_URL, client } from '@/services/api';
import { onError } from '@/containers/auth/checkAuth';
import { AuthForm, AuthInput, Message } from '@/components/index';

import { REGEXP, ERROR_MESSAGE } from '@/constants/auth';
import { useDispatch } from 'react-redux';
import { socket } from '@/services/socket/socket';
import { setUserInfo } from '@/redux/user/userSlice';
import { closeModal } from '@/redux/modal/modalSlice';
import { isInSlang } from '@/modules/Slang';

interface ErrorProps {
  errorId: string;
  errorPw: string;
  errorConfirmPw: string;
  errorNickname: string;
}

interface InputProps {
  id: string;
  pw: string;
  confirmPw: string;
  nickname: string;
}

interface Props {
  onToggle: (e: MouseEvent<HTMLElement>) => void;
}

const SignUp = ({ onToggle }: Props) => {
  const [errors, setErrors] = useState<ErrorProps>();
  const [sameId, setSameId] = useState<boolean>(false);
  const [sameNickname, setSameNickname] = useState<boolean>(false);
  const [idMessage, setIdMessage] = useState<string>('');
  const [nicknameMessage, setNicknameMessage] = useState<string>('');

  const dispatch = useDispatch();

  const { inputs, onInputChange } = useInput<InputProps>({
    id: '',
    pw: '',
    confirmPw: '',
    nickname: '',
  });

  const { id, pw, confirmPw, nickname } = inputs;
  const isSameIdValid = async (userId: string) => {
    if (!REGEXP.userId.test(userId)) {
      setIdMessage(ERROR_MESSAGE.idRegexError);
      return;
    }
    try {
      const { data } = await client.post('/auth/check/id', {
        id: userId,
      });
      setSameId(data.success);
      setErrors(undefined);
      if (data.success) {
        setIdMessage('사용 가능한 아이디 입니다!');
        setErrors(undefined);
      } else {
        setIdMessage('사용 불가능한 아이디 입니다!');
        setErrors(undefined);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) setSameId(error?.response?.data.success);
    }
  };

  const isSameNicknameValid = async (nickname: string) => {
    if (!REGEXP.userNickname.test(nickname)) {
      setNicknameMessage(ERROR_MESSAGE.nicknameRegexError);
      return;
    }
    if (isInSlang(nickname)) {
      setNicknameMessage(ERROR_MESSAGE.filterError);
      return;
    }
    try {
      const { data } = await client.post('/auth/check/name', {
        name: nickname,
      });
      setSameNickname(data.success);
      if (data.success) {
        setNicknameMessage('사용 가능한 닉네임 입니다!');
        setErrors(undefined);
      } else {
        setNicknameMessage('사용 불가능한 닉네임 입니다!');
        setErrors(undefined);
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        setSameNickname(error.response?.data.success);
    }
  };

  const onSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = onError({
      id,
      sameId,
      pw,
      confirmPw,
      nickname,
      sameNickname,
    });

    setErrors(errorMessage);

    if (Object.values(errorMessage).some((error) => error && error !== ''))
      return;

    const userInfo = {
      id: id,
      name: nickname,
      password: pw,
    };

    if (Object.values(userInfo).every((value) => value !== '')) {
      await axios
        .post(`${API_URL}/auth/signup`, userInfo)
        .then(async (response) => {
          if (response.status === 201) {
            await dispatch(closeModal());
            await alert('회원가입이 완료되었습니다.');
          }
        })
        .catch((error) => {
          console.error(`회원가입을 완료할 수 없습니다. ${error.response}`);
          return;
        });
      await client
        .post('auth/login', { email: userInfo.id, password: userInfo.password })
        .then(async (response) => {
          if (response.status === 201) {
            await dispatch(setUserInfo(response.data));
            socket.connect();
          }
        })
        .catch((error) => {
          console.error(`로그인을 완료할 수 없습니다. ${error}`);
          return;
        });
    }
  };

  const waktaLogin = async () => {
    const { data } = await client.get('auth/wakta');
    window.location.href = data.url;
  };

  return (
    <AuthForm
      formTitle="회원가입"
      onSubmit={onSignUpSubmit}
      onToggle={onToggle}
      onAuth={waktaLogin}
    >
      <AuthInput
        label="아이디 "
        desc="특수문자, 한글 제외 5~12자 내"
        type="text"
        placeholder="아이디 입력"
        name="id"
        value={id}
        onChange={onInputChange}
        onClick={isSameIdValid}
        minLength="5"
        maxLength="12"
        required={true}
      />
      {!errors && <Message message={idMessage} error={!sameId} />}
      {errors && <Message message={errors.errorId} error={true} />}
      <AuthInput
        label="닉네임 "
        desc="특수문자 제외 2~8글자"
        type="text"
        placeholder="닉네임 입력"
        name="nickname"
        value={nickname}
        onChange={onInputChange}
        onClick={isSameNicknameValid}
        minLength="2"
        maxLength="8"
        required={true}
      />
      {!errors && <Message message={nicknameMessage} error={!sameNickname} />}
      {errors && <Message message={errors.errorNickname} error={true} />}
      <AuthInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        name="pw"
        value={pw}
        onChange={onInputChange}
        required={true}
      />
      {errors && <Message message={errors.errorPw} error={true} />}
      <AuthInput
        type="password"
        placeholder="비밀번호 재입력"
        name="confirmPw"
        value={confirmPw}
        onChange={onInputChange}
        required={true}
      />
      {errors && <Message message={errors.errorConfirmPw} error={true} />}
    </AuthForm>
  );
};

export default SignUp;

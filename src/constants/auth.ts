const REGEXP = Object.freeze({
  userId: /^[A-Za-z0-9]{5,12}$/,
  userPassword: /^.{8,16}$/,
  userNickname: /^[가-힣A-Za-z]{2,10}$/,
});

const ERROR_MESSAGE = Object.freeze({
  requiredError: (formItem: string) => `${formItem}: 필수 정보입니다.`,
  duplicateError: (formItem: string) =>
    `이미 존재하는 ${formItem}이거나 중복 확인을 해주세요.`,
  idRegexError: '아이디: 대소문자 및 숫자 5-12자리로 입력 해주세요.',
  pwRegexError: '비밀번호: 8-16자리로 입력해 주세요.',
  nicknameRegexError: '닉네임: 한글 및 대소문자 2-8자리로 입력 해주세요.',
  confirmPwError: '비밀번호 확인: 비밀번호와 일치하지 않습니다.',
  isExistError: (formItem: string) => `${formItem}을 입력 해주세요.`,
  signInError:
    '아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인 해주세요.',
  filterError: '욕설은 젠황이 처리했으니 안심하라구.\n 다시 정하라구!',
});

export { REGEXP, ERROR_MESSAGE };

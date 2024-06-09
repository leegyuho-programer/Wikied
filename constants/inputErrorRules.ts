import { ERROR_MSG } from './inputErrorMsg';

export const colorCodeRules = {
  required: '값을 입력해주세요.',
  pattern: {
    value: /^#[a-zA-Z0-9]{6}$/,
    message: '형식이 맞지 않아요.',
  },
};

export const emailRules = {
  required: ERROR_MSG.emptyEmail,
  pattern: {
    value: /[0-9a-zA-Z]*@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i,
    message: ERROR_MSG.invalidEmail,
  },
};

export const nicknameRules = {
  required: ERROR_MSG.emptyNickname,
  pattern: {
    value: /^(?=.*[a-zA-Z0-9가-힣 ])[a-zA-Z0-9가-힣 ]{2,10}$/,
    message: ERROR_MSG.invalidNickname,
  },
};

export const signInPwRules = {
  required: ERROR_MSG.emptyPassword,
};

export const signUpPasswordRules = {
  required: ERROR_MSG.emptyPassword,
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
    message: ERROR_MSG.invalidPassword,
  },
};

export const signUpPasswordCheckRules = (target: any) => ({
  validate: (value: any) => value === target || ERROR_MSG.notEqualPassword,
});

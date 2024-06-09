export interface PostSignUp {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface PostLogin {
  email: string;
  password: string;
}

export interface PostRefreshToken {
  refreshToken: string;
}

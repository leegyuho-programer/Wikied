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

export interface PatchPassword {
  passwordConfirmation: string;
  password: string;
  currentPassword?: string;
}

export interface PostLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    profile: {
      id: number;
      code: string;
    };
  };
}

export interface PatchPasswordResponse {
  profile: {
    code: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
}

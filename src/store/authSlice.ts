import { StateCreator } from 'zustand';
import { AuthState, User } from './zustand.types';

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isLogin: false,
  user: null,
  userId: 0,
  userAccessToken: '',
  userRefreshToken: '',
  password: '',
  codeId: '',
  setSecurityQuestion: (securityQuestion) => set({ securityQuestion }),
  setSecurityAnswer: (securityAnswer) => set({ securityAnswer }),
  securityQuestion: null,
  securityAnswer: null,
  setLogin: (user: User, accessToken: string, refreshToken: string, password: string, codeId: string) =>
    set(() => ({
      isLogin: true,
      user,
      userId: user.id,
      userAccessToken: accessToken,
      userRefreshToken: refreshToken,
      password,
      codeId,
    })),
  setLogout: () =>
    set(() => ({
      isLogin: false,
      user: null,
      userId: 0,
      userAccessToken: '',
      userRefreshToken: '',
      password: '',
      codeId: '',
      securityQuestion: '',
      securityAnswer: '',
    })),
});

import { StateCreator } from 'zustand';
import { AuthState, User } from './zustand.types';
import removeStore from '@/utils/removeStore';

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isLogin: false,
  user: null,
  userId: 0,
  pageId: 0,
  setPageId: (pageId: number) => set({ pageId }),
  userAccessToken: '',
  userRefreshToken: '',
  password: '',
  codeId: '',
  setSecurityQuestion: (question) => set({ securityQuestion: question }),
  setSecurityAnswer: (answer) => set({ securityAnswer: answer }),
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
  setLogout: () => {
    set(() => ({
      isLogin: false,
      user: null,
      userId: 0,
      userAccessToken: '',
      userRefreshToken: '',
      password: '',
      codeId: '',
      securityQuestion: null,
    }));

    removeStore();
  },
});

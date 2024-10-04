import { StateCreator } from 'zustand';
import { AuthState, User } from './zustand.types';
import { saveTokenToCookies, getTokenFromCookies, removeTokenFromCookies } from './cookieUtils';
import removeStore from '@/utils/removeStore';

export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  isLogin: false,
  user: null,
  userId: 0,
  pageId: 0,
  setPageId: (pageId: number) => set({ pageId }),
  userAccessToken: getTokenFromCookies('userAccessToken') || '',
  userRefreshToken: getTokenFromCookies('userRefreshToken') || '',
  password: '',
  codeId: '',
  setSecurityQuestion: (question) => set({ securityQuestion: question }),
  setSecurityAnswer: (answer) => set({ securityAnswer: answer }),
  securityQuestion: null,
  securityAnswer: null,

  getUserAccessToken: () => get().userAccessToken,
  setUserAccessToken: (token: string) => {
    saveTokenToCookies('userAccessToken', token);
    set({ userAccessToken: token });
  },
  getUserRefreshToken: () => get().userRefreshToken,
  setUserRefreshToken: (token: string) => {
    saveTokenToCookies('userRefreshToken', token);
    set({ userRefreshToken: token });
  },

  setLogin: (user: User, accessToken: string, refreshToken: string, password: string, codeId: string) => {
    saveTokenToCookies('userAccessToken', accessToken);
    saveTokenToCookies('userRefreshToken', refreshToken);
    set({
      isLogin: true,
      user,
      userId: user.id,
      password,
      codeId,
    });
  },

  setLogout: () => {
    removeTokenFromCookies('userAccessToken');
    removeTokenFromCookies('userRefreshToken');
    set({
      isLogin: false,
      user: null,
      userId: 0,
      password: '',
      codeId: '',
      securityQuestion: null,
      securityAnswer: null,
    });
    removeStore();
  },
});

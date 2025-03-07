import { StateCreator } from 'zustand';
import { AuthState, User } from './zustand.types';
import { saveTokenToCookies, getTokenFromCookies, removeTokenFromCookies } from '../utils/cookieUtils';
import removeStore from '@/utils/removeStore';

export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  isLogin: false,
  user: null,
  userId: 0,
  userAccessToken: getTokenFromCookies('userAccessToken') || '',
  userRefreshToken: getTokenFromCookies('userRefreshToken') || '',
  password: '',
  codeId: '',
  setCodeId: (codeId: string | null) => set({ codeId }),
  setSecurityQuestion: (question) => set({ securityQuestion: question }),
  // setSecurityAnswer: (answer) => set({ securityAnswer: answer }),
  setSecurityAnswer: (answer) => {
    const currentUserId = get().userId;

    if (currentUserId) {
      localStorage.setItem(`securityAnswer_${currentUserId}`, answer ?? ''); // null이면 빈 문자열 저장
    }
    set({ securityAnswer: answer });
  },
  securityQuestion: null,
  securityAnswer: null,
  profileId: null,
  setProfileId: (profileId: number | null) => set({ profileId }),
  editingProfileId: null,
  setEditingProfileId: (editingProfileId: number | null) => set({ editingProfileId }),

  getUserAccessToken: () => get().userAccessToken,
  setUserAccessToken: (token: string) => {
    saveTokenToCookies('userAccessToken', token, 'AT');
    set({ userAccessToken: token });
  },
  getUserRefreshToken: () => get().userRefreshToken,
  setUserRefreshToken: (token: string) => {
    saveTokenToCookies('userRefreshToken', token, 'RT');
    set({ userRefreshToken: token });
  },

  setLogin: (user: User, accessToken: string, refreshToken: string, password: string, codeId: string) => {
    saveTokenToCookies('userAccessToken', accessToken, 'AT');
    saveTokenToCookies('userRefreshToken', refreshToken, 'RT');

    // 유저 프로필 이미지가 있는 경우 처리할 수 있도록 ready
    const profileImage = user.profile?.image || null;
    const savedSecurityAnswer = localStorage.getItem(`securityAnswer_${user.id}`);

    set({
      isLogin: true,
      user,
      userId: user.id,
      password,
      codeId,
      profileId: user.profile?.id || null,
      securityAnswer: savedSecurityAnswer || null, // 기존 보안 질문 답변 불러오기
      // 로그인 시 profileImage도 설정 (profileSlice에서 관리됨)
    });

    // profileImage 설정을 여기서 직접 할 수 없으므로 로그인 페이지나 API 호출 후 처리 필요

    set({
      isLogin: true,
      user,
      userId: user.id,
      password,
      codeId,
      profileId: user.profile?.id || null,
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
      codeId: null,
      securityQuestion: null,
      securityAnswer: null, // zustand 상태는 초기화, localStorage는 유지
      profileId: null,
      editingProfileId: null,
    });
    removeStore();
  },
});

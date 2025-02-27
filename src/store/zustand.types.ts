export interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  password?: string;
  profile: {
    id: number;
    code: string;
    image?: string;
  };
}

export interface AuthState {
  isLogin?: boolean;
  setLogin: (user: User, accessToken: string, refreshToken: string, password: string, codeId: string) => void;
  setLogout: () => void;
  userId: number;
  user: User | null;
  password: string;
  setUserId?: (data: number) => void;
  userAccessToken: string;
  userRefreshToken: string;
  codeId: string | null;
  securityQuestion?: string | null;
  setSecurityQuestion?: (question: string | null) => void;
  securityAnswer?: string | null;
  setSecurityAnswer?: (answer: string | null) => void;
  // pageId?: number | null;
  // setPageId?: (data: number) => void;
  profileId: number | null;
  setProfileId: (profileId: number | null) => void;
  editingProfileId: number | null;
  setEditingProfileId: (editingProfileId: number | null) => void;

  getUserAccessToken: () => string;
  setUserAccessToken: (token: string) => void;
  getUserRefreshToken: () => string;
  setUserRefreshToken: (token: string) => void;
}

export interface ArtworkState {
  clickedArtworkId: number;
  setClickedArtworkId: (id: number) => void;
}

export interface ArticleState {
  articleId: number;
  setArticleId: (id: number) => void;
}

export interface ProfileState {
  profileId: number | null;
  setProfileId: (profileId: number | null) => void;
  profileImage: string | null;
  setProfileImage: (profileImage: string | null) => void;
  editingProfileId: number | null;
  setEditingProfileId: (editingProfileId: number | null) => void;
}

export interface Profile {
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export type modalType = 'quiz' | 'overTime' | 'welcome';

export interface ModalState {
  modals: modalType[];
  showModal: (type: modalType) => void;
  hideModal: (type: modalType) => void;
  clearModal: () => void;
}

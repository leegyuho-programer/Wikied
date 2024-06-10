export interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  password: string;
  profile: {
    id: number;
    code: string;
  };
}

export interface AuthState {
  isLogin?: boolean;
  setLogin: (user: User, accessToken: string, refreshToken: string, password: string) => void;
  setLogout: () => void;
  userId: number;
  user: User | null;
  password: string;
  setUserId?: (data: number) => void;
  userAccessToken: string;
  setUserAccessToken?: (data: string) => void;
  userRefreshToken: string;
  setUserRefreshToken?: (data: string) => void;
}

export interface ArtworkState {
  clickedArtworkId: number;
  setClickedArtworkId: (id: number) => void;
}

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ArtworkState, AuthState, User } from './zustand.types';
import { createAuthSlice } from './authSlice';
import { createArtworkSlice } from './artworkSlice';

type SliceType = AuthState & ArtworkState;

export const useStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createArtworkSlice(...a),
      }),
      {
        name: 'store',
        partialize: (state) => ({
          userId: state.userId,
          user: state.user,
          userAccessToken: state.userAccessToken,
          userRefreshToken: state.userRefreshToken,
          isLogin: state.isLogin,
          clickedArtworkId: state.clickedArtworkId,
          password: state.password,
        }),
      }
    )
  )
);

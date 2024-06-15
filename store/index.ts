import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ArtworkState, AuthState, ArticleState, ProfileState } from './zustand.types';
import { createAuthSlice } from './authSlice';
import { createArtworkSlice } from './artworkSlice';
import { createArticleSlice } from './articleSlice';
import { createProfileSlice } from './profileSlice';

type SliceType = AuthState & ArtworkState & ArticleState & ProfileState;

export const useStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createArtworkSlice(...a),
        ...createArticleSlice(...a),
        ...createProfileSlice(...a),
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
          articleId: state.articleId,
          profileId: state.profileId,
          profileImage: state.profileImage,
        }),
      }
    )
  )
);

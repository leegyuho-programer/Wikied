import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ArtworkState, AuthState, ArticleState } from './zustand.types';
import { createAuthSlice } from './authSlice';
import { createArtworkSlice } from './artworkSlice';
import { createArticleSlice } from './articleSlice';

type SliceType = AuthState & ArtworkState & ArticleState;

export const useStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createArtworkSlice(...a),
        ...createArticleSlice(...a),
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
        }),
      }
    )
  )
);

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ArtworkState, AuthState, ArticleState, ProfileState, ModalState } from './zustand.types';
import { createAuthSlice } from './authSlice';
import { createArtworkSlice } from './artworkSlice';
import { createArticleSlice } from './articleSlice';
import { createProfileSlice } from './profileSlice';
import { createModalSlice } from './modalSlice';

type SliceType = AuthState & ArtworkState & ArticleState & ProfileState & ModalState;

export const useStore = create<SliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createArtworkSlice(...a),
        ...createArticleSlice(...a),
        ...createProfileSlice(...a),
        ...createModalSlice(...a),
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
          codeId: state.codeId,
          securityQuestion: state.securityQuestion,
          securityAnswer: state.securityAnswer,
          articleId: state.articleId,
          profileId: state.profileId,
          profileImage: state.profileImage,
        }),
      }
    )
  )
);

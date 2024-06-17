import { StateCreator } from 'zustand';
import { ArticleState } from './zustand.types';

export const createArticleSlice: StateCreator<ArticleState> = (set) => ({
  articleId: 0,
  setArticleId: (id: number) => set({ articleId: id }),
});

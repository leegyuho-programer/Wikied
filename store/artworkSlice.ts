import { StateCreator } from 'zustand';
import { ArtworkState } from './zustand.types';

export const createArtworkSlice: StateCreator<ArtworkState> = (set) => ({
  clickedArtworkId: 0,
  setClickedArtworkId: (id) => set((state) => ({ ...state, clickedArtworkId: id })),
});

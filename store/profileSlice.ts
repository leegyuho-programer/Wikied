import { StateCreator } from 'zustand';
import { ProfileState } from './zustand.types';

export const createProfileSlice: StateCreator<ProfileState> = (set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  profileCode: null,
  setProfileCode: (code) => set({ profileCode: code }),
});

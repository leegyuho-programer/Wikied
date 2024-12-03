import { StateCreator } from 'zustand';
import { ProfileState } from './zustand.types';

export const createProfileSlice: StateCreator<ProfileState> = (set) => ({
  profileId: null,
  setProfileId: (profileId) => set({ profileId }),
  profileImage: null,
  setProfileImage: (profileImage) => set({ profileImage }),
  editingProfileId: null,
  setEditingProfileId: (editingProfileId) => set({ editingProfileId }),
});

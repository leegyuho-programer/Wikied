import { ModalState } from './zustand.types';
import { StateCreator } from 'zustand';

export const createModalSlice: StateCreator<ModalState> = (set) => ({
  modals: [],
  showModal: (type) =>
    set((state) => ({
      modals: state.modals.includes(type) ? state.modals : [...state.modals, type],
    })),
  hideModal: (type) =>
    set((state) => ({
      modals: state.modals.filter((modalType) => modalType !== type),
    })),
  clearModal: () => set(() => ({ modals: [] })),
});

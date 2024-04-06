// Packages
import { create } from 'zustand';

// filter modal store 
const useFilterModal = create((set) => ({
  // storing the states for the filter modal
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilterModal;
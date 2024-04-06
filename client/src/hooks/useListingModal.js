// Packages
import { create } from 'zustand';

// listing modal store
const useListingModal = create((set) => ({
  // storing states for the listing modal
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useListingModal;
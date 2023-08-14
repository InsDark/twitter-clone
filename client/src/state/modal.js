import { create } from 'zustand'
export const modalStore = create((set) => ({
    modalComponent: null,
    isOpen: false,
    setIsOpen: (value) => set(() => ({ isOpen: value })),
    setComponent: (element) => set(() => ({ modalComponent: element })),
    
}))
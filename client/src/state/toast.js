import { create } from 'zustand'
export const toastStore = create((set) => ({
    toast: null,
    setToast: (toastFn) => set(() => ({ toast: toastFn })),
}))
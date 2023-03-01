import {create} from 'zustand'

export const authStore = create((set) => ({
    auth: [],
    setAuth: (credentials) => set(() => ({auth: [...credentials]}))
}))
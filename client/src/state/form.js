import { create } from 'zustand'
export const formStore = create((set) => ({
    email: '',
    password: '',
    userName: '',
    name: '',
    updateUserName: (newUserName) => set(() => ({ userName: newUserName })),
    updateName: (newName) => set(() => ({ name: newName })),
    updateEmail: (newEmail) => set(() => ({ email: newEmail })),
    updatePassword: (newPassword) => set(() => ({ password: newPassword })),
}))
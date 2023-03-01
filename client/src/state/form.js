import { create } from 'zustand'
export const formStore = create((set) => ({
    email: '',
    password: '',
    userName: '',
    name: '',
    isValidEmail: false,
    isValidPassword: false,
    isValidName: false,
    isValidUserName: false,
    updateUserName: (newUserName) => set(() => ({ userName: newUserName })),
    validUserName: (status) => set( () => ({ isValidUserName: status })),
    updateName: (newName) => set(() => ({ name: newName })),
    validName: (status) => set(() => ({ isValidName: status })),
    updateEmail: (newEmail) => set(() => ({ email: newEmail })),
    validEmail: (status) => set(() => ({ isValidEmail: status })),
    updatePassword: (newPassword) => set(() => ({ password: newPassword })),
    validPassword: (status) => set(() => ({ isValidPassword: status }))
}))
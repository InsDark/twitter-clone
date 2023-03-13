import { create } from 'zustand'
const userDataStore = create((set) => ({
    name: "",
    following: [],
    followers: [],
    updateFollowing: (newFollower) => set((state) => ({ following: [...state.following, newFollower] })),
    setName: (newName) => set({name: newName})
}))

export default userDataStore
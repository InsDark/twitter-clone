import { create } from 'zustand'
const userDataStore = create((set) => ({
    following: [],
    followers: [],
    updateFollowing: (newFollower) => set((state) => ({ following: [...state.following, newFollower] }))
}))

export default userDataStore
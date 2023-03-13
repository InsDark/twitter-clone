import {create} from 'zustand'
export const usersToFollowStore = create((set) => ({
    toFollow: [],
    setToFollow : (users) => set({toFollow: users}) 
}))
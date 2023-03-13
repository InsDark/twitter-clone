import { create } from 'zustand'
export const profileStore = create((set) => ({
    userInfo: {name: '', following: [], followers: [] },
    userExists : true,
    tweets: [],
    setUserInfo: (info) => set( () =>({ userInfo: info })),
    setTweets: (tweets) => set(() => ({ tweets })) ,   
    setUserExist: (exist) => set({userExists: exist}),
    setFollowers: (newFollowers => set((state) => ({userInfo : {...state.userInfo, followers: newFollowers}})))
})
)
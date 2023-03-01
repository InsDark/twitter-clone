import { create } from 'zustand'
export const profileStore = create((set) => ({
    userInfo: {},
    tweets: [],
    setUserInfo: (info) => set(() => ({userInfo: info})),
    setTweets: (tweets) => set(() => ({tweets}))
})
)
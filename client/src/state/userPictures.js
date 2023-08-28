import {create} from 'zustand'
export const userPicturesStore = create((set) => ({
    profilePicture: '',
    coverPicture: '',
    profilePicBlob:null ,
    coverPicBlob: null,
    setProfilePicture : (picture) => set({profilePicture: picture}),
    setCoverPicture:(picture) => set({coverPicture: picture}),
    setProfilePic: (blob) => set({profilePicBlob: blob}), 
    setCoverPic: (blob) => set({coverPicBlob: blob}) 
}))
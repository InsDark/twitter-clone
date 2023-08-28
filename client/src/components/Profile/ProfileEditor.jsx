import React, { useEffect } from 'react'
import { authStore } from './../../state/auth'
import InputUserName from './../Form/InputUserName'
import InputName from './../Form/InputName'
import ImageUploader from '../ImageUploader'
import { formStore } from './../../state/form'
import { userPicturesStore } from './../../state/userPictures'
import { UploadClient } from '@uploadcare/upload-client'
import { updateUser } from '../../../api/mutations/updateUser'

const ProfileEditor = () => {
    const { auth } = authStore(state => state)
    const { updateName, updateUserName, userName: userNameUpdated, name: newName } = formStore(state => state)
    const { credentials: { userName, name } } = auth
    const { profilePicture, coverPicture, profilePicBlob, coverPicBlob } = userPicturesStore()
    useEffect(() => {
        updateName(name)
        updateUserName(userName)
    }, [])
    return (
        <form onSubmit={(e) => e.preventDefault()} className='text-white px-3 py-3 ' >
            <ImageUploader src={coverPicture} defaultSrc={`http://via.placeholder.com/600x200`} width={'600px'} height={'200px'} ImgType={'cover'} />

            <ImageUploader src={profilePicture} defaultSrc={`https://api.dicebear.com/6.x/bottts/svg?seed=${userName}`} width={'10rem'} height={'auto'} ImgType={'picture-image'} />

            <div className='gap-3 flex flex-col mt-3'>

                <InputName value={name} showLabel={true} />
                {/* <InputUserName value={userName} showLabel={true} /> */}

                <input onClick={async () => {
                    const { token } = JSON.parse(localStorage.getItem('credentials'))

                    if (!profilePicBlob || !coverPicBlob) return
                    const client = new UploadClient({ publicKey: import.meta.env.VITE_UPLOADCARE_API_KEY })
                    const [profilePicRes, coverPicRes] = await Promise.allSettled([
                        client.uploadFile(profilePicBlob),
                        client.uploadFile(coverPicBlob)
                    ])
                    if (profilePicRes.status == 'fulfilled' && coverPicRes.status == 'fulfilled') {
                        
                        const res = await updateUser({ token, profilePicture: profilePicRes.value.cdnUrl, coverPicture: coverPicRes.value.cdnUrl, name: newName, userName })
                    } else {
                        alert('something happened')
                    }

                }} className='bg-blue-600 p-2 rounded cursor-pointer hover:bg-blue-700' type="submit" value={"Update"} />
            </div>
        </form>
    )
}

export default ProfileEditor
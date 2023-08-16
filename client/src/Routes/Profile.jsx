import React from 'react'
import {  useParams } from 'react-router-dom'
import SideBar from '../components/SideBar'
import UserBar from '../components/UserBar'
import ModalComponent from '../components/Modal'
import { modalStore } from '../state/modal'
import UserProfile from '../components/Profile/UserProfile'
const Profile = () => {
    const {userID} = useParams()
    document.title = "Profile / " + userID
    const {isOpen, modalComponent} = modalStore(state => state)
    return (
        <main className='md:card mobile bg-black text-white min-h-screen'>
            <UserBar />
            <UserProfile userID={userID}/>
            <SideBar />
            <ModalComponent isOpen={isOpen} contentElement={modalComponent}/>
        </main>
    )
}

export default Profile
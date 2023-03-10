import React, { useEffect } from 'react'
import { getUserData } from '../../api/queries/getUserData'
import SideBar from '../components/SideBar'
import TweetMaker from '../components/TweetMaker'
import {authStore} from '../state/auth'
import UserBar from '../components/UserBar'
import userDataStore from '../state/userData'
import TweetsContainer from '../components/TweetsContainer'
const Home = () => {
    const {credentials: {userName}} = authStore(state => state.auth)
    const {setName} = userDataStore(state => state) 
    useEffect(() => {
        (async()=> {
           const res = await getUserData(userName)
           const {data : {user: {name}}} = res
           setName(name)
        })()
    },[])
    return (
        <main className='card bg-black text-white min-h-screen'>
            <UserBar/>
            <section className='border border-gray-700 w-full '>
                <h2 className='text-2xl font-bold'>Home</h2>
                <TweetMaker/>
                <TweetsContainer/>
            </section>
            <SideBar/> 
        </main>
    )
}

export default Home
import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Main = () => {
    document.title = "Welcome to Twitter!!"
    return (
        <div className='md:grid md:grid-cols-2 p-3 md:p-0 flex flex-col h-[100vh] max-h-[100vh] bg-black'>
            <div className=' flex items-center justify-center'>
                <img className='md:h-[100vh] md:block  hidden' src='https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png' />
                <FaTwitter color='white' className='md:absolute md:text-[350px] text-[4rem]'  />
            </div>
            <main className=' flex-1 font-bold p-10 text-white flex-col gap-3 flex justify-between'>
                <h1 className='text-7xl font-mono'>Happening now</h1>
                <h2 className='text-4xl font-mono'>Join Twitter today</h2>
                <div className='flex flex-col justify-between gap-7'>
                    <Link to={'/register'} className='bg-blue-500 text-center w-[50%] rounded-full p-3'>Create Account</Link>
                    <span className='text-center w-[50%] text-xl'>or</span>
                    <Link to={'/login'} className='text-center border w-[50%] border-white text-blue-500 p-3 rounded-full'>Log In</Link>
                </div>
            </main>
        </div>
    )
}

Main.propTypes = {}

export default Main
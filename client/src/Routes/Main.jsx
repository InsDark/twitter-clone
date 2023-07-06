import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Main = () => {
    return (
        <div className='grid grid-cols-2 bg-black'>
            <div className='flex items-center justify-center'>
                <img className='h-[100vh]' src='https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png' />
                <FaTwitter color='white' className='absolute' size={350} />
            </div>
            <main className=' font-bold p-10 text-white flex-col flex justify-between'>
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
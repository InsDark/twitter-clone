import React from 'react'
import { authStore } from './../../state/auth'
const ProfileEditor = () => {
    const { auth } = authStore(state => state)
    const { credentials: { userName } } = auth
    console.log(auth)
    return (
        <form onSubmit={(e) => e.preventDefault()} className='text-white px-3 py-3 ' >
            <div >
                <img className='relative w-[600px] h-[200px]' src="http://via.placeholder.com/600x200" />

                <div className='relative z-[0] bg-black w-[6rem] h-auto p-1 rounded-full border-4  border-slate-800 mt-[-3rem] '>

                    <img className=' z-[9]  w-[6rem] h-auto' src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userName}`} alt="" />
                </div>
            </div>
            <div className='gap-3 flex flex-col mt-3'>
                <div className='border-gray-700 focus-within:border-blue-700   rounded-xl p-3 flex flex-col border-2'>
                    <label className='text-gray-500 text-sm' htmlFor="">Name</label>
                    <input type="text" className='bg-black text-xl outline-none' value={'Hola a todos'} />
                </div>

                <div className='border-gray-700 focus-within:border-blue-700  border-2 rounded-xl p-3 flex flex-col'>
                    <label className='text-gray-500 text-sm' htmlFor="">User Name</label>
                    <input type="text" className='bg-black text-xl outline-none' value={'Hola a todos'} />
                </div>
            </div>
            <input className='bg-blue-600 mt-3 p-2 rounded cursor-pointer hover:bg-blue-700' type="submit" value={"Update"} />
        </form>
    )
}

export default ProfileEditor
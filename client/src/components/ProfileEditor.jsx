import React from 'react'

const ProfileEditor = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()} className='text-white px-3 py-3'>
            <div>
                <img className='w-[600px] h-[200px]' src="http://via.placeholder.com/600x200" />
                <img className='  mt-[-3rem] w-[5rem] h-auto' src={`https://api.dicebear.com/6.x/bottts/svg?seed=${'Dieres'}`} alt="" />
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
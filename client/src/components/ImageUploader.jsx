import React from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import {modalStore} from './../state/modal'
import MediaEditor from './MediaEditor'

const ImageUploader = ({ src, defaultSrc, width, height, ImgType }) => {
    const {setComponent} = modalStore(state => state)
    return (
        <div className={` relative bg-black h-auto   ${ImgType == 'cover' ? "w-full" : " mt-[-3rem] border-slate-800 border-4 w-[6rem] rounded-full"}`}>
            <div className={`right-0 top-0 flex items-center justify-center w-full h-full absolute`}>
                <label htmlFor={ImgType} >
                    <MdAddAPhoto className='relative text-white bg-gray-600 bg-transparent hover:text-gray-600 cursor-pointer' />
                </label>
                <input onChange={(e) => {
                    setComponent(<MediaEditor ImgType={ImgType} file={e.target.files[0]} />)
                }} id={ImgType} type="file" accept='image/png, image/jpg, image/jpeg' name={ImgType} className='hidden' />
            </div>
            <img className={ ` ${ImgType == 'cover' ? "" : "rounded-full"} w-[${width}] h-[${height}]`} src={src || defaultSrc} alt="profile-picture" />
        </div>
    )
}

export default ImageUploader
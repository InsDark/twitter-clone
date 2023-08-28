import React, { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import { modalStore } from './../state/modal'
import ProfileEditor from './Profile/ProfileEditor.jsx'
import { userPicturesStore } from './../state/userPictures'

const MediaEditor = ({ ImgType, file }) => {
    const { setProfilePic, setCoverPic, setProfilePicture, setCoverPicture } = userPicturesStore(state => state)

    const [imgSizes, setImgSizes] = useState({ width: 0, height: 0 })
    const url = URL.createObjectURL(file)
    const { setComponent } = modalStore(state => state)
    useEffect(() => {
        const img = new Image()
        img.onload = function () {
            var sizes = {
                width: this.width,
                height: this.height
            };
            URL.revokeObjectURL(this.src);
            setImgSizes(sizes)

        }
        img.src = url

    }, [])

    return (
        <div className=' w-auto flex flex-col items-center justify-center'>
            <img id='picture'  src={url}  alt="dasdasdasd" className={ ImgType == 'cover' ? ` w-[600px] h-[200px]` : 'w-[10rem] h-[10rem]'} />

            <button onClick={async () => {
                const canvas = await html2canvas(document.querySelector('#picture'), { backgroundColor: 'rgb(16,20,24)', allowTaint: false })
                if (ImgType == 'cover') {
                    canvas.toBlob((blob) =>  setCoverPic(blob))
                    setCoverPicture(canvas.toDataURL())
                } else {
                    canvas.toBlob((blob) =>  setProfilePic(blob))

                    setProfilePicture(canvas.toDataURL())

                }

                setComponent(<ProfileEditor />)


            }} className='text-xl p-1 hover:text-blue-600 text-gray-500'>Save</button>
        </div>
    )
}

export default MediaEditor
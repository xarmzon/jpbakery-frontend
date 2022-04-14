import DashboardLayout from '@components/Layout/DashboardLayout'
import { getErrorMessage } from '@utils/index'
import { ALLOWED_FILE_SIZE_DP, ROUTES } from '@utils/constants'
import api from '@utils/fetcher'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BiPencil } from 'react-icons/bi'
import { FaFan } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { addUser } from '@redux/slice/auth'
import { AuthSlice } from '@utils/types'
import {format} from "timeago.js"

const ProfilePage:NextPage = () => {
    const user = useAppSelector(state=>state.auth.user)
    const dispatch = useAppDispatch()
    const [showUploadSpinner, setShowUploadSpinner] = useState<boolean>(false)
    const [imageData,setImageData] = useState<string>("")
    const imageInputRef = useRef<HTMLInputElement>(null)
    const showImagePicker = ()=> {
        if(showUploadSpinner)return
        imageInputRef?.current?.click()
    }

    const saveImageToDB = async (buffer:string)=>{
        setImageData(buffer)
        try {
            const {data} = await api.patch(`${ROUTES.API.USER}picture`, {picture: buffer})
            toast.success(data?.msg)
            const userNewData = {
                ...user,
                picture: buffer
            } as AuthSlice["user"]
            localStorage.setItem("user", JSON.stringify(userNewData))
            dispatch(addUser(userNewData))
        } catch (error:any) {
            toast.error(getErrorMessage(error))
        }
        setImageData("")
        setShowUploadSpinner(false)
    }
    const handleImage = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files? e.target.files[0]: undefined;
        
        if(file){
                if(file.size > ALLOWED_FILE_SIZE_DP){
                    toast.error("The Image is too large, please try again with another image less than "+ (ALLOWED_FILE_SIZE_DP/1024).toFixed(1) + "KB" )
                    return
                }
                setImageData("")    
                const reader = new FileReader();
        reader.onloadstart = () => setShowUploadSpinner(true);
        reader.onload = () => saveImageToDB(reader.result as string)
        reader.onerror = () => {
          setShowUploadSpinner(false);
        };

        reader.readAsDataURL(file);
            }
    }

  return (
    <DashboardLayout title='Profile'>
        <div className="shadow-md flex items-center flex-col space-y-3 rounded-md p-5 max-w-sm min-h-[300px] mx-auto bg-secondary-t1/30 backdrop-blur-sm">
            <div className="h-32 w-32 rounded relative">
                {
                    !showUploadSpinner && (
                        <div onClick={showImagePicker} className="absolute -right-1 top-5 z-[4] h-6 w-6 cursor-pointer rounded-full bg-white-x100 flex items-center justify-center shadow-sm text-secondary">
                <BiPencil/>
                </div>
                    )
                }
                <input accept=".jpeg, .jpg, .png" onChange={handleImage} ref={imageInputRef} type="file" className='hidden' />
            <div onClick={showImagePicker} className="relative h-32 w-32 bg-secondary-t1 rounded-full overflow-hidden">
                {
                    showUploadSpinner && (
                        <>
                        <div className="absolute inset-0 w-full h-full bg-secondary/50 backdrop-blur-sm z-[6]"></div>
                            <div className="z-[7] absolute text-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FaFan className="animate-spin text-secondary-t3/80" />
                        </div>
                        </>
                    )
                }
                <Image src={imageData && imageData.length >0 ? imageData : user?.picture ? user?.picture :  "/images/profile_avatar.png"} layout='fill' alt="profile photo" objectFit='cover' />
            </div>
            </div>
            <div className="w-full text-center flex flex-col space-y-3">
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm ">Full Name</span>
                    <span className="font-bold">{user?.fullName?? ""}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm ">Email</span>
                    <span className="font-bold">{user?.email?? ""}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm ">Joined</span>
                    <span className="font-bold">{user?.createdAt? format(user?.createdAt) :  "Unknown"}</span>
                </div>
            </div>
        </div>
    </DashboardLayout>
  )
}

export default ProfilePage
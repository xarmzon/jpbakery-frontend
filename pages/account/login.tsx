import Button from '@components/Button'
import Input from '@components/common/controls/Input'
import AuthLayout from '@components/Layout/AuthLayout'
import { getErrorMessage } from '@utils/index'
import { ROUTES } from '@utils/constants'
import api from '@utils/fetcher'
import { LoginForm } from '@utils/types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { BiLock, BiMailSend } from 'react-icons/bi'
import { useAppDispatch } from '@redux/store'
import { addToken, addUser, setLoading, setLoginState } from '@redux/slice/auth'

const login = "Login"
const LoginPage:NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [submitText, setSubmitText] = useState(login);
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginForm>(
    ()=>Object.assign({}, ...Object.keys(formData).map(key=>({
    [key]: ""
  }))))

  const handleChange = (e: FormEvent<HTMLInputElement>)=>{
    const key = e.currentTarget.name 
    const val = e.currentTarget.value 
    setFormData((prev) => {
      return { ...prev, [key]: val };
    });
    const err = errors[key as keyof LoginForm]
    if(err && err.length > 0) setErrors(prev=>({...prev, [key]: ""}))
  }
  const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(submitText !== login) return;
    setSubmitText("Loading...")
   try {
    const {data} = await api.post(ROUTES.API.LOGIN, {...formData})
    toast.success(data.msg)
    localStorage.setItem("user", JSON.stringify(data?.user))
    localStorage.setItem("token", data?.token)
    dispatch(addToken(data?.token))
    dispatch(addUser(data?.user))
    dispatch(setLoginState(true))
    router.push(ROUTES.DASHBOARD.OVERVIEW)
   } catch (err:any) {
     toast.error(getErrorMessage(err))
   }
   setSubmitText(login)
  }

  return <AuthLayout title="Login">
    <div className="p-5 flex flex-col justify-center h-full w-full space-y-5">
      <h1 className="font-bold text-2xl text-slate-700 text-center">Login</h1>
      <div className="">
        <form className='flex flex-col space-y-7' onSubmit={handleSubmit}>
          
          <div className="flex flex-col">
              <Input
                showLabel
                labelValue="Email"
                required
                type="email"
                name="email"
                value={formData.email}
                placeholder=""
                onChange={handleChange}
                error={errors.email}
                leftIcon={<BiMailSend/>}
                disabled={submitText !== login}
              />
          </div>
          <div className="flex flex-col">
              <Input
                showLabel
                labelValue="Password"
                required
                type="password"
                name="password"
                value={formData.password}
                placeholder=""
                onChange={handleChange}
                error={errors.password}
                leftIcon={<BiLock/>}
                disabled={submitText !== login}
              />
          </div>
         
          <div className="text-center mb-5">
              <Input
                type="submit"
                value={submitText}
                isBtn
                disabled={submitText !== login}
              />
              <div className="mt-2">
                <p className="text-xs md:text-sm">
                  Or{" "}
                  <Button linkClassName='text-secondary hover:text-ascent-light' isLink href={ROUTES.ACCOUNT.SIGNUP} text="Register Here"/>
                  
                </p>
              </div>
            </div>
        </form>
      </div>
    </div>
  </AuthLayout>
}

export default LoginPage
import Button from '@components/Button'
import Input from '@components/common/controls/Input'
import AuthLayout from '@components/Layout/AuthLayout'
import { ROUTES } from '@utils/constants'
import api from '@utils/fetcher'
import { RegForm } from '@utils/types'
import { NextPage } from 'next'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { BiLock, BiMailSend, BiUser } from 'react-icons/bi'
import { getErrorMessage, validateAccountForm } from '@utils/index'
import { useRouter } from 'next/router'

const joinUs = 'Join Us'

const SignUpPage: NextPage = () => {
  const router = useRouter()
  const [submitText, setSubmitText] = useState(joinUs)
  const [formData, setFormData] = useState<RegForm>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    cPassword: '',
  })
  const [errors, setErrors] = useState<RegForm>(() =>
    Object.assign(
      {},
      ...Object.keys(formData).map((key) => ({
        [key]: '',
      }))
    )
  )

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name
    const val = e.currentTarget.value
    setFormData((prev) => {
      return { ...prev, [key]: val }
    })
    const err = errors[key as keyof RegForm]
    if (err && err.length > 0) setErrors((prev) => ({ ...prev, [key]: '' }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitText !== joinUs) return
    const errors = validateAccountForm(formData, true)
    if (errors.length > 0) {
      errors.map((err) => {
        setErrors((prev) => {
          return { ...prev, [err.name]: err?.msg }
        })
      })
      return
    }
    setSubmitText('Loading...')
    try {
      const { data } = await api.post(ROUTES.API.SIGNUP, { ...formData })
      toast.success(data.msg)
      setTimeout(() => router.push(ROUTES.ACCOUNT.LOGIN), 2000)
    } catch (err: any) {
      toast.error(getErrorMessage(err))
    }
    setSubmitText(joinUs)
  }

  return (
    <AuthLayout title="Join Us">
      <div className="flex h-full w-full flex-col justify-center space-y-5 p-5">
        <h1 className="text-center text-2xl font-bold text-slate-700">
          Join Us
        </h1>
        <div className="">
          <form className="flex flex-col space-y-7" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Input
                showLabel
                labelValue="Full Name"
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder=""
                onChange={handleChange}
                error={errors.fullName}
                leftIcon={<BiUser />}
              />
            </div>
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
                leftIcon={<BiMailSend />}
                disabled={submitText !== joinUs}
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
                leftIcon={<BiLock />}
                disabled={submitText !== joinUs}
              />
            </div>
            <div className="flex flex-col">
              <Input
                showLabel
                labelValue="Confirm Password"
                required
                type="password"
                name="cPassword"
                value={formData.cPassword}
                placeholder=""
                onChange={handleChange}
                error={errors.cPassword}
                leftIcon={<BiLock />}
                disabled={submitText !== joinUs}
              />
            </div>
            <div className="mb-5 text-center">
              <Input
                type="submit"
                value={submitText}
                isBtn
                disabled={submitText !== joinUs}
              />
              <div className="mt-2">
                <p className="text-xs md:text-sm">
                  Or{' '}
                  <Button
                    linkClassName="text-secondary hover:text-ascent-light"
                    isLink
                    href={ROUTES.ACCOUNT.LOGIN}
                    text="Login Here"
                  />
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUpPage

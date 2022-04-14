import Input from '@components/common/controls/Input'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { getErrorMessage } from '@utils/index'
import { ALLOWED_FILE_SIZE_DP, ROUTES } from '@utils/constants'
import api from '@utils/fetcher'
import { NewOrderForm } from '@utils/types'
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { BiPencil } from 'react-icons/bi'
import Select from '@components/common/controls/Select'
import Image from 'next/image'
import { FaFan } from 'react-icons/fa'
import { setPayment, toggleModal } from '@redux/slice/dashboard'

const sendRequest = 'Send Request'
const RequestModal = () => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [showUploadSpinner, setShowUploadSpinner] = useState<boolean>(false)
  const [submitText, setSubmitText] = useState(sendRequest)
  const [formData, setFormData] = useState<NewOrderForm>({
    sampleCakeImage: '',
    cakeColors: '',
    cakeSize: 'sm',
    deliveryDate: '',
    deliveryAddress: '',
    charges: 10000,
    nameOnCake: '',
  })

  useEffect(() => {
    return () => {
      Object.entries(formData).forEach(([key, val]) => {
        setFormData((prev) => ({
          ...prev,
          [key]: typeof val === 'number' ? 0 : '',
        }))
      })
      if (showUploadSpinner) setShowUploadSpinner(false)
    }
  }, [formData, showUploadSpinner])

  const showImagePicker = () => {
    if (showUploadSpinner || submitText !== sendRequest) return
    imageInputRef?.current?.click()
  }

  const handleRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitText !== sendRequest) return

    if (!formData.sampleCakeImage) {
      toast.error('Please provide a sample image')
      return
    }
    if (!formData.deliveryAddress || formData.deliveryAddress.length < 10) {
      toast.error('Please provide a proper address')
      return
    }
    if (!formData.cakeSize || formData.cakeSize.length < 2) {
      toast.error('Please provide a proper size')
      return
    }
    if (!formData.nameOnCake || formData.nameOnCake.length < 2) {
      toast.error('Please provide a proper name for the cake')
      return
    }
    const inOneDay = new Date().getTime() + 1000 * 60 * 60 * 24 * 1
    const userDate = new Date(formData.deliveryDate).getTime()

    if (inOneDay > userDate) {
      toast.error('Sorry, Please fix your delivery date')
      return
    }
    try {
      setSubmitText('Loading...')
      const { data } = await api.post(ROUTES.API.ORDER, { ...formData })
      toast.success(data?.msg)
      dispatch(
        setPayment({
          amount: formData.charges,
          email: user?.email ?? '',
          order: {
            ...formData,
            id: data?.orderId,
          },
        })
      )
      dispatch(
        toggleModal({
          open: true,
          type_: 'payment',
        })
      )
    } catch (error) {
      toast.error(getErrorMessage(error))
      console.log(error)
    }
    setSubmitText(sendRequest)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name
    const val = e.currentTarget.value
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }))
  }
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const key = e.currentTarget.name
    const val = e.currentTarget.value
    setFormData((prev) => ({
      ...prev,
      [key]: val,
      charges:
        val === 'sm'
          ? 10000
          : val === 'md'
          ? 15000
          : val === 'lg'
          ? 25000
          : 10000,
    }))
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined

    if (file) {
      if (file.size > ALLOWED_FILE_SIZE_DP) {
        toast.error(
          'The Image is too large, please try again with another image less than ' +
            (ALLOWED_FILE_SIZE_DP / 1024).toFixed(1) +
            'KB'
        )
        return
      }
      setFormData((prev) => ({
        ...prev,
        sampleCakeImage: '',
      }))
      const reader = new FileReader()
      reader.onloadstart = () => setShowUploadSpinner(true)
      reader.onload = () =>
        setFormData((prev) => ({
          ...prev,
          sampleCakeImage: reader.result as string,
        }))
      reader.onerror = () => setShowUploadSpinner(false)

      reader.onloadend = () => setShowUploadSpinner(false)

      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleRequest} className="flex flex-col space-y-4">
      <div className="flex flex-col self-center">
        <div className="relative h-32 w-32 rounded">
          {!showUploadSpinner && (
            <div
              onClick={showImagePicker}
              className="absolute -right-1 top-5 z-[4] flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white-x100 text-secondary shadow-sm"
            >
              <BiPencil />
            </div>
          )}
          <input
            accept=".jpeg, .jpg, .png"
            onChange={handleImage}
            ref={imageInputRef}
            type="file"
            className="hidden"
          />
          <div
            onClick={showImagePicker}
            className="relative h-32 w-32 overflow-hidden rounded-full bg-secondary-t1"
          >
            {showUploadSpinner && (
              <>
                <div className="absolute inset-0 z-[6] h-full w-full bg-secondary/50 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 z-[7] -translate-x-1/2 -translate-y-1/2 transform text-4xl">
                  <FaFan className="animate-spin text-secondary-t3/80" />
                </div>
              </>
            )}
            <Image
              src={
                formData.sampleCakeImage && formData.sampleCakeImage.length > 0
                  ? formData.sampleCakeImage
                  : '/images/cake_thumbnail.png'
              }
              layout="fill"
              alt="profile photo"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Input
          showLabel
          labelValue="Name on Cake"
          required
          type="text"
          name="nameOnCake"
          value={formData.nameOnCake}
          onChange={handleChange}
          disabled={submitText !== sendRequest}
        />
      </div>
      <div className="flex flex-col">
        <Input
          showLabel
          labelValue="Delivery Date"
          required
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          disabled={submitText !== sendRequest}
        />
      </div>
      <div className="flex flex-col">
        <Input
          showLabel
          labelValue="Delivery Address"
          required
          type="text"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          disabled={submitText !== sendRequest}
        />
      </div>
      <div className="flex flex-col">
        <Input
          showLabel
          labelValue="Cake Colors(separate with space)"
          required
          type="text"
          min="500"
          name="cakeColors"
          value={formData.cakeColors}
          onChange={handleChange}
          disabled={submitText !== sendRequest}
        />
      </div>
      <div className="flex flex-col">
        <Select
          options={[
            { text: 'Small', value: 'sm' },
            { text: 'Medium', value: 'md' },
            { text: 'Large', value: 'lg' },
          ]}
          showLabel
          labelValue="Cake Size"
          required
          name="cakeSize"
          value={formData.cakeSize}
          onChange={handleChangeSelect}
          disabled={submitText !== sendRequest}
        />
      </div>
      <div className="mb-5 text-center">
        <Input
          type="submit"
          value={submitText}
          isBtn
          disabled={submitText !== sendRequest}
        />
      </div>
    </form>
  )
}

export default RequestModal

import Modal from 'react-modal'
import { HiXCircle } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { toggleModal } from '@redux/slice/dashboard'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import Input from '@components/common/controls/Input'
import { NewOrderForm } from '@utils/types'
import Select from '@components/common/controls/Select'
import Image from 'next/image'
import { BiPencil } from 'react-icons/bi'
import toast from 'react-hot-toast'
import { ALLOWED_FILE_SIZE_DP, ROUTES } from '@utils/constants'
import { FaFan } from 'react-icons/fa'
import api from '@utils/fetcher'
import { getErrorMessage } from '@utils/index'
import PaystackPayment from '@components/paystack'


const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none',
    padding: 0,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex:"90"
  },
}


const sendRequest = "Send Request"
const RequestModal = () => {
 
    const {modalOpen} = useAppSelector(state=>state.dashboard)
    const user = useAppSelector(state=>state.auth.user)
    const dispatch = useAppDispatch()
    const imageInputRef = useRef<HTMLInputElement>(null)

    const [showUploadSpinner, setShowUploadSpinner] = useState<boolean>(false)
    const [showPayment, setShowPayment] = useState<boolean>(false)
    const [showReceipt, setShowReceipt] = useState<boolean>(false)
    const [submitText, setSubmitText] = useState(sendRequest);
    const [formData, setFormData] = useState<NewOrderForm>({
        sampleCakeImage: "",
        cakeColors: "",
        cakeSize: "sm",
        deliveryDate: "",
        deliveryAddress: "",
        charges: 10000,
        nameOnCake: "",
    });
    const [orderId, setOrderId] = useState<string>("")

    const showImagePicker = ()=> {
        if(showUploadSpinner || submitText !== sendRequest)return
        imageInputRef?.current?.click()
    }
  const onRequestClose = () => {
      const yes = confirm("Do you really want to close the Modal?")
    if(!yes)return;
      Object.entries(formData).forEach(([key, val])=>{
          setFormData(prev=>({
              ...prev,
              [key]: typeof val === "number"? 0 : ""
          }))
      })
      if(showUploadSpinner)setShowUploadSpinner(false)
    dispatch(toggleModal(false))
  }
  const handleRequest = async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      if(submitText !== sendRequest)return;
      
      if(!formData.sampleCakeImage){
          toast.error("Please provide a sample image")
          return;
      }
      if(!formData.deliveryAddress || formData.deliveryAddress.length < 10){
          toast.error("Please provide a proper address")
          return;
      }
      if(!formData.cakeSize || formData.cakeSize.length < 2){
          toast.error("Please provide a proper size")
          return;
      }
      if(!formData.nameOnCake || formData.nameOnCake.length < 2){
          toast.error("Please provide a proper name for the cake")
          return;
      }
      const inOneDay = new Date().getTime() + (1000 * 60 * 60 * 24 * 1)
      const userDate = new Date(formData.deliveryDate).getTime()

      if(inOneDay > userDate){
          toast.error("Sorry, Please fix your delivery date")
          return;
      }
      try {
          setSubmitText("Loading...")
          const {data} = await api.post(ROUTES.API.ORDER, {...formData})
          toast.success(data?.msg)
          setOrderId(data?.orderId)
          setShowPayment(true)
        } catch (error) {
            toast.error(getErrorMessage(error))
            console.log(error);
        }
        setSubmitText(sendRequest)

  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
      const key = e.currentTarget.name
      const val = e.currentTarget.value
      setFormData((prev)=>({
          ...prev,
          [key]: val
      }))
  }
  const handleChangeSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
      const key = e.currentTarget.name
      const val = e.currentTarget.value
      setFormData((prev)=>({
          ...prev,
          [key]: val,
          charges: val ==="sm"? 10000: val ==="md"? 15000 : val === "lg"? 25000 : 10000
      }))
  }

  const handleImage = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files? e.target.files[0]: undefined;
    
    if(file){
            if(file.size > ALLOWED_FILE_SIZE_DP){
                toast.error("The Image is too large, please try again with another image less than "+ (ALLOWED_FILE_SIZE_DP/1024).toFixed(1) + "KB" )
                return
            }
            setFormData(prev=>({
                ...prev,
                sampleCakeImage: ""
            }))
            const reader = new FileReader();
    reader.onloadstart = () => setShowUploadSpinner(true);
    reader.onload = () => setFormData(prev=>({
        ...prev,
        sampleCakeImage: reader.result as string
    }))
    reader.onerror = () => setShowUploadSpinner(false);

    reader.onloadend = ()=> setShowUploadSpinner(false);

    reader.readAsDataURL(file);
        }
}

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className="text-primary relative flex h-[80vh] max-h-[450px] w-[80vw] max-w-[350px] flex-col justify-center overflow-hidden  rounded-2xl bg-gradient-to-b from-primary/50 to-slate-900/60 shadow-lg backdrop-blur-[4px] lg:max-h-[550px] lg:max-w-[450px] lg:space-y-8">
        <div className="fixed z-[9] right-0 top-0 left-0 flex h-12 w-full items-center justify-end bg-white pr-3">
          <HiXCircle
            className="cursor-pointer text-2xl text-red-700 lg:text-3xl"
            onClick={onRequestClose}
          />
        </div>
       <div className="bg-white-x100/70 overflow-y-scroll scrollbar-none text-white-x200 p-5 mb-5 w-[90%] mx-auto mt-14 rounded-lg shadow-lg backdrop-blur-sm h-full">
           {showPayment ? (<div className='w-full h-full flex justify-center items-center'>
               <PaystackPayment amount={formData.charges*100} email={user?.email?? ""} orderId={orderId} onComplete={(msg)=>console.log(msg)}/>
           </div>) : (
           <form onSubmit={handleRequest} className="flex flex-col space-y-4">
           <div className="flex flex-col self-center">
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
                <Image src={formData.sampleCakeImage && formData.sampleCakeImage.length >0 ? formData.sampleCakeImage :  "/images/cake_thumbnail.png"} layout='fill' alt="profile photo" objectFit='cover' />
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
                options={[{text: "Small", value: "sm"},{text: "Medium", value: "md"},{text: "Large", value: "lg"},]}
                showLabel
                labelValue="Cake Size"
                required
                name="cakeSize"
                value={formData.cakeSize}
                onChange={handleChangeSelect}
                disabled={submitText !== sendRequest}
              />
          </div>
          <div className="text-center mb-5">
              <Input
                type="submit"
                value={submitText}
                isBtn
                disabled={submitText !== sendRequest}
              />
              
            </div>
           </form>
           )}
       </div>
      </div>
    </Modal>
  )
}

export default RequestModal

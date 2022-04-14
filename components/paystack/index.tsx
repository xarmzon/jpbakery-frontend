import { useState, useRef, useEffect } from 'react'
import { usePaystackPayment } from 'react-paystack'
import dateformat from 'dateformat'
import { APP_NAME, MESSAGES, ROUTES } from '@utils/constants'
import api from '@utils/fetcher'
import toast from 'react-hot-toast'
import { formatPrice, getErrorMessage } from '@utils/index'
import Image from 'next/image'
import Loader from '@components/Loader'
import Button from '@components/Button'
import { BiCheck, BiCheckCircle } from 'react-icons/bi'

export interface PaystackProps {
  email: string
  amount: number
  reference?: string
  orderId: string
  onComplete: (msg: string) => void
}

const PaystackPayment = ({
  onComplete,
  email,
  amount,
  reference = '',
  orderId,
}: PaystackProps) => {
  const [paymentSuccessfulText, setPaymentSuccessfulText] = useState<string>('')
  const [paymentText, setPaymentText] = useState<string>('Make Payment')
  const [refNum, setRefNum] = useState<string>(() => {
    if (reference && reference.length > 0) {
      return reference
    }

    let ref = dateformat(new Date(), 'isoUtcDateTime')
    ref = ref
      .replace('-', '')
      .replace(':', '')
      .replace('-', '')
      .replace(':', '')
      .split('Z')[0]
    return APP_NAME.split(' ')[0] + '-' + ref
  })

  const makePayment = usePaystackPayment({
    email,
    amount,
    reference: refNum,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || '',
  })

  useEffect(() => {
    if (paymentText === 'Verify') {
      verifyPayment()
    } else if (paymentText === 'Successful') {
      setTimeout(() => setPaymentText('Make Payment'), 1000)
    }
  }, [paymentText])

  const onSuccess = (ref: string) => {
    setPaymentText('Verify')
  }
  const performPayment = async () => {
    switch (paymentText) {
      case 'Make Payment':
        setPaymentText('Loading...')
        //add Payment data to database
        try {
          const { data } = await api.post(`${ROUTES.API.PAYMENT}`, {
            reference: refNum,
            order: orderId,
            charges: amount,
          })
          //make payment
          makePayment(
            (ref: string) => onSuccess(ref), //onSuccess callback
            () => setPaymentText('Make Payment') //onClose callback
          )
        } catch (e) {
          toast.error(getErrorMessage(e))
          setPaymentText('Make Payment')
        }

        break
      case 'Verify Payment':
        verifyPayment()
        break
    }
  }

  const verifyPayment = async () => {
    setPaymentText('Validating...')
    try {
      const { data } = await api.get(
        `${ROUTES.API.PAYMENT}verify?&reference=${refNum}`
      )
      toast.success('Payment Added')
      updatePayment()
      setPaymentText('Done')
    } catch (e) {
      toast.error('Payment Verification Failed')
    }
  }

  const updatePayment = async () => {
    try {
      const { data } = await api.patch(`${ROUTES.API.PAYMENT}`, {
        reference: refNum,
        status: true,
      })
      setPaymentSuccessfulText('Payment successful. Your order is complete')
      setTimeout(() => onComplete(refNum), 3000)
    } catch (e) {
      toast.error('Failed to update Payment status')
    }
  }
  return (
    <div className="flex h-full w-full flex-col items-center space-y-3">
      {paymentText === 'Done' ? (
        <div className="my-5 flex w-full flex-1 flex-col items-center justify-center space-y-3 text-center text-6xl text-green-success">
          <BiCheckCircle />
          <span className="text-lg">{paymentSuccessfulText}</span>
        </div>
      ) : (
        <>
          <p className="mt-3 text-center text-base text-secondary">
            Please make your payment in order to confirm your Order
          </p>
          <p className="text-center text-3xl font-bold text-primary md:text-4xl">
            <span className="text-base">&#8358;</span>
            {formatPrice(amount / 100)}
          </p>
          <p className="text-center text-xs font-bold text-secondary md:text-sm">
            Reference Number<span className="block italic">{refNum}</span>
          </p>

          {!paymentText.includes('.') ? (
            <Button
              className="!text-xs md:!text-base"
              text={paymentText}
              onClick={performPayment}
            />
          ) : (
            <div className="">
              <Loader text={paymentText} />
            </div>
          )}
        </>
      )}
      <div className="relative mx-auto h-8 w-[80%] flex-1 shrink-0">
        <Image
          alt="paystack"
          layout="fill"
          objectFit="contain"
          src="/images/paystack-badge-cards-ngn.png"
        />
      </div>
    </div>
  )
}

export default PaystackPayment

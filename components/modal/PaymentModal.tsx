import PaystackPayment from '@components/paystack'
import { setModalType, setReceipt } from '@redux/slice/dashboard'
import { useAppDispatch, useAppSelector } from '@redux/store'
import React from 'react'

const PaymentModal = () => {
  const payment = useAppSelector((state) => state.dashboard.payment)
  const dispatch = useAppDispatch()
  const handleShowReceipt = (ref: string) => {
    dispatch(
      setReceipt({
        ...payment?.order,
        reference: ref,
      })
    )
    dispatch(setModalType('receipt'))
  }
  const initPayment = () => {
    if (payment) {
      return (
        <PaystackPayment
          amount={payment.amount * 100}
          email={payment.email}
          orderId={payment.order.id}
          onComplete={handleShowReceipt}
        />
      )
    }
    return (
      <p className="text-center text-lg text-red-light">Invalid Payment Data</p>
    )
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      {initPayment()}
    </div>
  )
}

export default PaymentModal

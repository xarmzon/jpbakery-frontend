import { useAppSelector } from '@redux/store'
import React from 'react'

const ReceiptModal = () => {
  const receipt = useAppSelector((state) => state.dashboard.payment)

  return <div>{JSON.stringify(receipt, undefined, 4)}</div>
}

export default ReceiptModal

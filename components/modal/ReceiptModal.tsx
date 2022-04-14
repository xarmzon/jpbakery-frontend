import { useAppSelector } from '@redux/store'
import Image from 'next/image'
import React from 'react'

const ReceiptModal = () => {
  const receipt = useAppSelector((state) => state.dashboard.receipt)

  console.log(receipt)
  return (
    <div className="flex h-full w-full flex-col space-y-4">
      <div className="relative h-40 w-40 self-center overflow-hidden rounded-xl bg-secondary-t1">
        <Image
          src={
            receipt?.sampleCakeImage
              ? receipt?.sampleCakeImage
              : '/images/cake_thumbnail.png'
          }
          layout="fill"
          alt="profile photo"
          objectFit="cover"
        />
      </div>
      <div className="flex-1"></div>
    </div>
  )
}

export default ReceiptModal

import { useAppSelector } from '@redux/store'
import Image from 'next/image'
import React from 'react'
import format from 'dateformat'
import { formatPrice } from '@utils/index'

const ReceiptModal = () => {
  const receipt = useAppSelector((state) => state.dashboard.receipt)

  const prepareData = () =>
    Object.entries(receipt!).filter(
      ([key, val]) => key !== 'sampleCakeImage' && key !== 'id'
    )
  const processTitle = (key: string) => {
    switch (key) {
      case 'cakeColors':
        return 'Cake Colors'
      case 'cakeSize':
        return 'Cake Size'
      case 'deliveryDate':
        return 'Delivery Date'
      case 'deliveryAddress':
        return 'Delivery Address'
      case 'charges':
        return 'Charges'
      case 'nameOnCake':
        return 'Name on Cake'
      case 'reference':
        return 'Order Reference'
    }
  }

  const processText = (val: string | number, key: string) => {
    if (key === 'charges') return formatPrice(val)
    if (key === 'deliveryDate') return format(val, 'longDate')
    if (key === 'cakeSize') {
      switch (val) {
        case 'sm':
          return 'Small'
        case 'md':
          return 'Medium'
        case 'lg':
          return 'Large'
      }
    }
    return val
  }

  return (
    <div className="flex h-full w-full flex-col space-y-4">
      <div className="relative h-40 w-40 shrink-0 self-center overflow-hidden rounded-xl bg-secondary-t1">
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
      <div className="flex flex-1 flex-col space-y-4 pb-8 text-primary">
        {prepareData().map(([key, val], i) => (
          <div
            className="relative flex flex-col space-y-1 divide-y divide-secondary-d1/30"
            key={i}
          >
            <h3 className="self-end text-xs">{processTitle(key)}</h3>
            <p className="text-sm text-slate-500">
              {key === 'charges' && <span className="">&#8358;</span>}
              {processText(val, key)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReceiptModal

import { useAppSelector } from '@redux/store'
import Image from 'next/image'
import { processText, processTitle } from '@utils/index'

const ReceiptModal = () => {
  const receipt = useAppSelector((state) => state.dashboard.receipt)

  const prepareData = () =>
    Object.entries(receipt!).filter(
      ([key, _]) => key !== 'sampleCakeImage' && key !== 'id'
    )

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
            <h3 className="self-end text-xs lg:text-sm">{processTitle(key)}</h3>
            <p className="text-sm text-slate-500 lg:text-base">
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

import Loader from '@components/Loader'
import { ReactNode } from 'react'

interface IDashboardCard {
  loading: boolean
  icon: ReactNode
  text: string
  count: number
  className?: string
}
const DashboardCard = ({
  icon,
  loading,
  text,
  count,
  className = '',
}: IDashboardCard) => {
  return (
    <div
      className={`flex min-h-[180px] items-center space-x-2 rounded-xl border border-secondary-t3 bg-white-x100/40 p-5 shadow-lg transition-all duration-700 hover:border-secondary-t1 sm:space-y-5 sm:shadow-xl ${className}`}
    >
      <div className="shrink-0 basis-1/6 text-4xl text-secondary sm:text-5xl">
        {icon}
      </div>
      <div className="flex flex-1 flex-col space-y-5 text-center sm:space-y-3">
        <h3 className="text-3xl font-bold text-primary">
          {loading ? <Loader showText={false} /> : <span>{count}</span>}
        </h3>
        <p className="text-xs sm:text-sm lg:text-base">{text}</p>
      </div>
    </div>
  )
}

export default DashboardCard

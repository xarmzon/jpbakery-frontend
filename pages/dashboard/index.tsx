import DashboardCard from '@components/dashboard/DashboardCard'
import DashboardLayout from '@components/Layout/DashboardLayout'
import useFetch from '@hooks/useFetch'
import { useAppSelector } from '@redux/store'
import { ROUTES } from '@utils/constants'
import { NextPage } from 'next'
import { BiCartAlt, BiCheckCircle, BiReceipt } from 'react-icons/bi'

const Dashboard: NextPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const { data, loading, error } = useFetch(ROUTES.API.OVERVIEW)
  return (
    <DashboardLayout title="Dashboard">
      <div className="flex w-full flex-col space-y-8">
        <div className="rounded-lg bg-secondary-t3 p-5">
          <h3 className="text-xl font-bold capitalize md:text-2xl">
            Hi, {user?.fullName ? user?.fullName.split(' ')[0] : 'There'}
          </h3>
          <p className="mt-2 text-xs md:text-base">
            Ready to start your day with some awesome cakes? Request for cakes
            in order to fill day with great pleasure and happiness
          </p>
        </div>
        <div className="grid w-full gap-y-8 sm:max-w-xl sm:grid-cols-2 sm:justify-center sm:gap-8 lg:max-w-3xl lg:grid-cols-3 xl:max-w-4xl">
          <DashboardCard
            count={data?.orders}
            loading={loading}
            text="Orders"
            icon={<BiCartAlt />}
          />
          <DashboardCard
            count={data?.payments}
            loading={loading}
            text="Payments"
            icon={<BiReceipt />}
          />
          <DashboardCard
            count={data?.confirmedPayments}
            loading={loading}
            text="Confirmed Payments"
            icon={<BiCheckCircle />}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

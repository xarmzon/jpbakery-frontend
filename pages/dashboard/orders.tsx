import DataTable from '@components/common/controls/DataTable'
import DashboardLayout from '@components/Layout/DashboardLayout'
import useFetch from '@hooks/useFetch'
import { PER_PAGE, ROUTES } from '@utils/constants'
import { NextPage } from 'next'
import { format } from 'timeago.js'
import dateformat from 'dateformat'
import { useAppDispatch } from '@redux/store'
import { setReceipt, toggleModal } from '@redux/slice/dashboard'
import { processStatusText } from '@utils/index'

const Orders: NextPage = () => {
  const dispatch = useAppDispatch()
  const { data, loading, error, page, handlePagination, handleSearch } =
    useFetch(ROUTES.API.ORDER)

  const showDetailModal = (id: string) => {
    const item = data?.results?.find((d: any) => d?._id === id)
    if (!item) return
    const receipt = Object.entries(item).filter(
      ([key, _]) => key !== 'user' && key !== '_id' && key !== 'payment'
    )
    dispatch(
      setReceipt({
        ...Object.fromEntries(receipt),
        reference: item.payment?.reference,
        status: processStatusText(item.payment?.status),
      })
    )
    dispatch(toggleModal({ open: true, type_: 'receipt' }))
  }
  return (
    <DashboardLayout title="Orders">
      <DataTable
        header={[
          'Name On Cake',
          'Delivery Address',
          'Delivery Date',
          'Added',
          'Status',
        ]}
        data={
          !error && data
            ? [
                ...data?.results?.map((d: any) => ({
                  id: d._id,
                  values: [
                    <p key={d.nameOnCake} title={d.nameOnCake}>
                      {d.nameOnCake}
                    </p>,
                    <p key={d.deliveryAddress} title={d.deliveryAddress}>
                      {d.deliveryAddress}
                    </p>,
                    <p
                      key={d.deliveryDate}
                      title={`${dateformat(d.deliveryDate, 'mediumDate')}`}
                    >
                      {dateformat(d.deliveryDate, 'mediumDate')}
                    </p>,
                    <p key={d.createdAt} title={`${format(d.createdAt)}`}>
                      {format(d.createdAt)}
                    </p>,
                    <p
                      className={`${
                        processStatusText(d.payment?.status) === 'Confirmed'
                          ? 'text-green-success'
                          : 'text-red-light'
                      }`}
                      key={d.payment?.status}
                      title={`${processStatusText(d.payment?.status)}`}
                    >
                      {processStatusText(d.payment?.status)}
                    </p>,
                  ],
                })),
              ]
            : []
        }
        itemClickable
        loading={loading}
        onSearch={(val: string) => handleSearch(val)}
        page={page}
        perPage={data?.paging?.perPage ? data?.paging?.perPage : PER_PAGE}
        totalPage={data?.paging?.totalPages ? data?.paging?.totalPages : 1}
        handlePagination={(page: number) => handlePagination(page)}
        onClickItem={showDetailModal}
      />
    </DashboardLayout>
  )
}

export default Orders

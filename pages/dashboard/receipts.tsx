import DataTable from '@components/common/controls/DataTable'
import DashboardLayout from '@components/Layout/DashboardLayout'
import useFetch from '@hooks/useFetch'
import { processStatusText, formatPrice } from '@utils/index'
import { PER_PAGE, ROUTES } from '@utils/constants'
import { NextPage } from 'next'
import React from 'react'
import { format } from 'timeago.js'
import dateformat from 'dateformat'
const ReceiptsPage: NextPage = () => {
  const { data, loading, error, page, handlePagination, handleSearch } =
    useFetch(ROUTES.API.PAYMENT)

  return (
    <DashboardLayout title="Receipts">
      <DataTable
        header={['Reference', 'Charges', 'Delivery Date', 'Added', 'Status']}
        data={
          !error && data
            ? [
                ...data?.results?.map((d: any) => ({
                  id: d._id,
                  values: [
                    <p key={d.reference} title={d.reference}>
                      {d.reference}
                    </p>,
                    <p key={d.order.charges} title={d.order.charges}>
                      &#8358;{formatPrice(d.order.charges)}
                    </p>,
                    <p
                      key={d.order.deliveryDate}
                      title={`${dateformat(
                        d.order.deliveryDate,
                        'mediumDate'
                      )}`}
                    >
                      {dateformat(d.order.deliveryDate, 'mediumDate')}
                    </p>,
                    <p key={d.createdAt} title={`${format(d.createdAt)}`}>
                      {format(d.createdAt)}
                    </p>,
                    <p
                      className={`${
                        processStatusText(d.status, 'payment') === 'Paid'
                          ? 'text-green-success'
                          : 'text-red-light'
                      }`}
                      key={d.status}
                      title={`${processStatusText(d.status, 'payment')}`}
                    >
                      {processStatusText(d.status, 'payment')}
                    </p>,
                  ],
                })),
              ]
            : []
        }
        loading={loading}
        onSearch={(val: string) => handleSearch(val)}
        page={page}
        perPage={data?.paging?.perPage ? data?.paging?.perPage : PER_PAGE}
        totalPage={data?.paging?.totalPages ? data?.paging?.totalPages : 1}
        handlePagination={(page: number) => handlePagination(page)}
      />
    </DashboardLayout>
  )
}

export default ReceiptsPage

import { IData, IHeader } from '@utils/types'
import { useState, useEffect, useRef, FormEvent } from 'react'
import Pagination from '../pagination'

export interface DataTableProps {
  header: IHeader[]
  data: IData[]
  loading: boolean
  onSearch(val: string): void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  totalPage: number
  page: number
  perPage: number
  handlePagination(page: number): void
  showEdit?: boolean
  showDelete?: boolean
  itemClickable?: boolean
  onClickItem?: (id: string) => void
}

const DataTable = ({
  header,
  data,
  loading,
  onSearch,
  onEdit,
  onDelete,
  totalPage = 1,
  handlePagination,
  page,
  perPage,
  showDelete = false,
  showEdit = false,
  itemClickable = false,
  onClickItem,
}: DataTableProps) => {
  const [searchVal, setSearchVal] = useState<string>('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(searchVal)
  }

  const handleAction = (type: string, id: string) => {
    switch (type) {
      case 'edit':
        onEdit && onEdit(id)
        break

      case 'delete':
        onDelete && onDelete(id)
        break

      case 'item':
        onClickItem && onClickItem(id)

      default:
        return
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="my-4 w-full">
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search..."
          type="search"
          className="w-full rounded border-0 bg-gray-50 focus:border-0 focus:shadow-md focus:ring-0"
        />
      </form>
      <div className="h-[400px] w-full overflow-x-scroll px-3 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-secondary-t3 md:h-[550px]">
        <table className="w-full px-3">
          {!loading && data.length === 0 && (
            <tbody>
              <tr className="mt-12 flex items-center justify-center text-center text-lg font-bold text-secondary">
                <td>No Data To Display</td>
              </tr>
            </tbody>
          )}
          {loading && (
            <tbody>
              <tr className="mt-12 flex items-center justify-center text-center text-lg font-bold text-secondary">
                <td>Loading Data..............</td>
              </tr>
            </tbody>
          )}
          {!loading && data.length > 0 && (
            <>
              <thead className="px-4 text-primary">
                <tr>
                  <th className="px-2">#</th>
                  {header.map((h, i) => (
                    <th
                      className={`${
                        i === 0 ? 'w-2/4 md:w-[25%]' : ''
                      } px-5 py-2`}
                      key={h}
                    >
                      {h}
                    </th>
                  ))}
                  {(showDelete || showEdit) && <th>Actions</th>}
                </tr>
              </thead>
              <tbody className="px-4 text-secondary">
                {!loading &&
                  data.length > 0 &&
                  data.map((d, i1) => (
                    <tr
                      onClick={() =>
                        itemClickable ? handleAction('item', d.id!) : undefined
                      }
                      key={i1}
                      className={`border-b-2 border-gray-200 px-4 ${
                        itemClickable ? 'cursor-pointer' : ''
                      }`}
                    >
                      <td className={`p-5 py-3`}>
                        {perPage * page - (perPage - (i1 + 1))}
                      </td>
                      {d.values.map((d2, i2) => (
                        <td
                          className={`${
                            i2 === 0 || i2 === 1 ? 'text-left' : 'text-center'
                          } px-5 py-3`}
                          key={i2}
                        >
                          {d2}
                        </td>
                      ))}
                      <td className="mt-2 flex flex-col justify-center space-y-3">
                        {showEdit && (
                          <button
                            className="border-0 px-2 py-1 uppercase text-primary shadow-md"
                            onClick={() => handleAction('edit', d.id!)}
                          >
                            Update
                          </button>
                        )}
                        {showDelete && (
                          <button
                            className="border-0 px-3  py-1 uppercase text-red-600 shadow-md"
                            onClick={() => handleAction('delete', d.id!)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
      </div>
      <div className="flex w-full items-center justify-between py-3 pr-1">
        <p className="text-xs sm:text-sm md:text-lg">
          {!loading && data.length > 0 && (
            <>
              Page {page} of {totalPage} {totalPage > 1 ? 'Pages' : 'Page'}
            </>
          )}
        </p>
        <Pagination
          totalPage={totalPage}
          onClick={(page: number) => handlePagination(page)}
          small
        />
      </div>
    </div>
  )
}

export default DataTable

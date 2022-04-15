import { useState } from 'react'

export interface BtnProps {
  onClick: (e: any) => void
  title: string
  disabled: boolean
  small: boolean
}

const Btn = (props: BtnProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        name={props.title}
        disabled={props.disabled}
        className={`px-5 py-2 text-primary shadow-md ring-1 ring-primary hover:bg-primary-t1 hover:shadow-none hover:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:ring-gray-200 ${
          props.small && 'px-4 py-1 text-sm'
        }`}
      >
        {props.title}
      </button>
    </>
  )
}

export interface PaginationProps {
  onClick: (page: number, type: string) => void
  small?: boolean
  totalPage?: number
  showCount?: boolean
}

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPage = props.totalPage || 1
  const handlePagination = (e: any) => {
    const type = e.target.name.toLowerCase()
    let page = currentPage
    switch (type) {
      case 'next':
        page = page === totalPage ? totalPage : page + 1
        break
      case 'prev':
        page = page === 1 ? 1 : page - 1
        break
      default:
        return
    }
    setCurrentPage((prev) => page)
    props.onClick(page, type)
  }
  return (
    <div className="">
      <div className={`flex ${props.small ? 'gap-4' : 'gap-8'} justify-center`}>
        <Btn
          title="Prev"
          disabled={currentPage == 1 && true}
          onClick={handlePagination}
          small={Boolean(props.small && props.small)}
        />
        <Btn
          title="Next"
          disabled={totalPage == currentPage && true}
          onClick={handlePagination}
          small={Boolean(props.small && props.small)}
        />
      </div>
      {props.showCount && (
        <div className="mt-2 text-center text-sm italic">
          Page {currentPage} of {totalPage}
        </div>
      )}
    </div>
  )
}

export default Pagination

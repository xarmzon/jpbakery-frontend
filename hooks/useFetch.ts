import { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

const useFetch = (url: string) => {
  const [searchVal, setSearchVal] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const { data, error, mutate } = useSWR(
    `${url}?search=${searchVal}&page=${page}`
  )
  const handleSearch = async (val: string) => {
    //   setSearchVal(val)
    toast.error('Not Implement yet')
  }
  const handlePagination = (page: number) => {
    setPage((prev) => page)
  }

  return {
    data,
    error,
    mutate,
    loading: !data && !error,
    handlePagination,
    handleSearch,
    page,
  }
}

export default useFetch

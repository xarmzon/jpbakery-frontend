import { useEffect, useState } from 'react'

const useSticky = () => {
  const [sticky, setSticky] = useState<boolean>(false)
  useEffect(() => {
    const stickyNav = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 1) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    stickyNav()
    addEventListener('scroll', stickyNav)
    return () => removeEventListener('scroll', stickyNav)
  }, [])
  return { sticky }
}

export default useSticky

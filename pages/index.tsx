import GeneralLayout from '@components/Layout/GeneralLayout'
import About from '@components/sections/Homepage/About'
import Gallery from '@components/sections/Homepage/Gallery'
import Hero from '@components/sections/Homepage/Hero'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <GeneralLayout>
      <Hero />
      <About />
      <Gallery />
    </GeneralLayout>
  )
}

export default Home

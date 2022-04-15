import GeneralLayout from '@components/Layout/GeneralLayout'
import About from '@components/sections/About'
import Gallery from '@components/sections/Gallery'
import Hero from '@components/sections/Hero'
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

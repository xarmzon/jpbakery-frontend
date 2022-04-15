import GlassyBg from '@components/common/GlassyBg'
import SubTitle from '@components/common/SubTitle'
import Title from '@components/common/Title'
import Image from 'next/image'
import React from 'react'

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="relative mt-10 min-h-[100vh] bg-secondary-t2/90 bg-cupcake bg-cover bg-center p-5 bg-blend-screen sm:p-8"
    >
      <div className="container">
        <Title text="Gallery" />
        <SubTitle text="Check out our gallery full of cakes ordered by our customers!" />
        <div className="mx-auto mt-8 grid max-w-4xl gap-5  md:grid-cols-3">
          <div className="flex min-h-[350px] flex-col space-y-3">
            <div className="relative flex-[1] shrink-0  overflow-hidden rounded-md">
              <Image
                src="/images/jason-leung-fXAuCMEYGY4-unsplash.jpg"
                alt="cake image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="flex min-h-[350px] flex-col space-y-3">
            <div className="relative min-h-[180px] flex-[1.5] shrink-0  overflow-hidden rounded-md">
              <Image
                src="/images/36db0e89e7d734b9cda514d976c32ed6.jpg"
                alt="cake image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative min-h-[200px] flex-1 shrink-0  overflow-hidden rounded-md">
              <Image
                src="/images/45331714_screenshot-20200524-234404_720x711.jpg"
                alt="cake image"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
          </div>
          <div className="flex min-h-[350px] flex-col space-y-3">
            <div className="relative flex-[1.5] shrink-0  overflow-hidden rounded-md">
              <Image
                src="/images/cakes-for-mom.png"
                alt="cake image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative flex-1 shrink-0  overflow-hidden rounded-md">
              <div className="flex h-full flex-wrap space-x-3">
                <div className="relative min-h-[100px] flex-1">
                  <Image
                    src="/images/independence-day-cake.png"
                    alt="cake image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                  />
                </div>
                <div className="relative min-h-[50px] flex-1">
                  <Image
                    src="/images/slashio-photography-T5KPTbbK-_E-unsplash.jpg"
                    alt="cake image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlassyBg className="top-[10%] -right-6 bg-yellow-light/40" />
    </section>
  )
}

export default Gallery

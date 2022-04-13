import GlassyBg from '@components/common/GlassyBg'
import SubTitle from '@components/common/SubTitle'
import Title from '@components/common/Title'
import { APP_NAME } from '@utils/constants'
import React from 'react'
import {
  BiRadar,
  BiMapPin,
  BiGift,
  BiGitRepoForked,
  BiHeartCircle,
} from 'react-icons/bi'
const cardData = [
  {
    icon: <BiGift />,
    title: 'One of a Kind',
    desc: 'A cake designed specially for you and your loved ones',
  },
  {
    icon: <BiGitRepoForked />,
    title: "Local & Int'l Styles",
    desc: 'Whipped cream base creating a fluffy texture that melts your mouth',
  },
  {
    icon: <BiRadar />,
    title: 'Quality',
    desc: 'All of our products are made with the finest quality ingredients and guaranteed fresh.',
  },
  {
    icon: <BiMapPin />,
    title: 'Indoor Delivery',
    desc: 'We are very punctual and promise to deliver fresh made products to every customer on time',
  },
  {
    icon: <BiHeartCircle />,
    title: 'Bake With Love',
    desc: 'We are passionate about baking. Each of our handmade items are carefully baked with love.',
  },
]

const About = () => {
  return (
    <section
      id="about"
      className="relative h-full w-full overflow-x-hidden pb-8"
    >
      <div className="container pt-8">
        <Title text={`Why ${APP_NAME}`} />
        <SubTitle text=" Every cake is made and designed to suit your taste and style" />
        <div className="mt-8">
          <div className="mx-auto grid w-[95%] max-w-xl gap-y-8 sm:grid-cols-2 sm:gap-8 lg:max-w-3xl lg:grid-cols-3 xl:max-w-4xl">
            {cardData.map((card, i) => (
              <div
                key={i}
                className={`flex min-h-[180px] items-center space-x-2 rounded-xl border border-transparent bg-white-x100/40 p-5 shadow-lg transition-all duration-700 hover:border hover:border-secondary-t3 sm:flex-col sm:space-y-5 sm:border sm:border-secondary-t3 sm:shadow-xl sm:hover:border-secondary-t1`}
              >
                <div className="shrink-0 basis-1/6 text-6xl text-primary sm:text-8xl">
                  {card.icon}
                </div>
                <div className="flex flex-1 flex-col space-y-5 sm:space-y-3 sm:text-center">
                  <h3 className="font-bold sm:text-lg">{card.title}</h3>
                  <p className="text-xs sm:text-sm lg:text-base">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GlassyBg className="top-[50%] -left-6 bg-primary/40" />
      <GlassyBg className="top-[10%] -right-6 bg-secondary/40" />
    </section>
  )
}

export default About

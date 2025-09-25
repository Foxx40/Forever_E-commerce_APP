import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicies from '../Components/OurPolicies'
import NewsLetterBox from '../Components/NewsLetterBox'
const Home = () => {
  return (
    <div>

      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicies/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home

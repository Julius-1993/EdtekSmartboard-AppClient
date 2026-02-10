import React from 'react'
import Banner from '../../components/Banner'
import Cateories from './Cateories'
import Testimonials from './Testimonials'
import Services from './Services'
import SpecialBoards from './SpecialBoards'
import About from '../../components/About'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Cateories/>
      <SpecialBoards/>
      <Testimonials/>
      <Services/>
    </div>
  )
}

export default Home
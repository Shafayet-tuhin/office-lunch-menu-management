import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import one from '../../../assets/home/01.jpg'
import two from '../../../assets/home/02.jpg'
import three from '../../../assets/home/03.png'
import four from '../../../assets/home/04.jpg'
import five from '../../../assets/home/05.png'
import six from '../../../assets/home/06.png'


const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={2500} >
      <div>
        <img src={one} />
      </div>
      <div>
        <img src={two} />
      </div>
      <div>
    
        <img src={three} />
      </div>
      <div>
        <img src={four} />
      </div>
      <div>
        <img src={five} />
      </div>
      <div>
        <img src={six} />
      </div>
    </Carousel>
  )
}

export default Banner
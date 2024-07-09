import React from 'react'
import Banner from '../Banner/Banner'
import OrderOnline from './../Order Online/OrderOnline';
import Menu from './../Menu/Menu';
import FromOurMenu from '../From our menu/FromOurMenu';
import Review from './../Customer Review/Review';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>

      <Helmet>
        <title>Home page</title>
      </Helmet>

      <Banner />
      <OrderOnline />
      <Menu />
      <FromOurMenu />
      <Review />
    </div>
  )
}

export default Home
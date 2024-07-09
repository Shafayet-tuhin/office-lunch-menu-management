import React from 'react'
import { Helmet } from 'react-helmet-async'
import Cover from './../../Shared/Cover/Cover';
import menucover from '../../../assets/menu/banner3.jpg'
import pizzacover from '../../../assets/menu/pizza-bg.jpg'
import saladcover from '../../../assets/menu/salad-bg.jpg'
import soupcover from '../../../assets/menu/soup-bg.jpg'
import dessertcover from '../../../assets/menu/dessert-bg.jpeg'
import useMenu from '../../../hooks/useMenu';
import MenuCatagory from './../Menu Catagory/MenuCatagory';

const Menu = () => {

  const [menu] = useMenu();

  const dessert = menu.filter(item => item.category === 'dessert')
  const pizza = menu.filter(item => item.category === 'pizza')
  const salad = menu.filter(item => item.category === 'salad')
  const soup = menu.filter(item => item.category === 'soup')
  const offered = menu.filter(item => item.category === 'offered')

  return (
    <div>
      <Helmet>
        <title>Menu page</title>
      </Helmet>

      <Cover img={menucover} title="OUR MENU" para="Would you like to try a dish?" />

      <div className='flex flex-col items-center gap-4 mb-12'>
        <p className='text-[#D99904] italic text-xl font-normal'>---Don't miss---</p>
        <hr className='w-[22rem]' />
        <p className='text-[#151515] font-normal text-[2.5rem] font-abc'>TODAY'S OFFER</p>
        <hr className='w-[23rem]' />
      </div>

      <MenuCatagory items={offered} />

      <Cover img={dessertcover} title="DESSERTS" para="Would you like to try Dessert?" />
      <MenuCatagory items={dessert} />

      <Cover img={pizzacover} title="PIZZA" para="Would you like to try Pizza?" />
      <MenuCatagory items={pizza} />

      <Cover img={saladcover} title="SALAD" para="Would you like to try SALAD?" />
      <MenuCatagory items={salad} />

      <Cover img={soupcover} title="SOUP" para="Would you like to try SOUP?" />
      <MenuCatagory items={soup} />


    </div>
  )
}

export default Menu
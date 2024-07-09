import React, { useState } from 'react';
import ordercover from '../../../assets/shop/banner2.jpg';
import Cover from './../../Shared/Cover/Cover';
import useMenu from '../../../hooks/useMenu';
import SingleOrder from './SingleOrder';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const [menu] = useMenu();
    const [activeTab, setActiveTab] = useState(5);

    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')

    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div>
            
            <Helmet>
                 <title>Order Food</title>
            </Helmet>


            <Cover img={ordercover} title="OUR SHOP" para='Would you like to try a dish?' />

            <div role="tablist" className="tabs tabs-bordered justify-center">

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="DRINKS" checked={activeTab === 5} onChange={() => handleTabChange(5)} />
                <div role="tabpanel" className="tab-content p-10">
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        {
                            drinks.map((item) => {
                                return (
                                    <SingleOrder key={item._id} item={item} />
                                )
                            })
                        }
                    </div>
                </div>



                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="SALAD" checked={activeTab === 1} onChange={() => handleTabChange(1)} />
                <div role="tabpanel" className="tab-content p-10">
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        {
                            salad.map((item) => {
                                return (
                                    <SingleOrder key={item._id} item={item} />
                                )
                            })
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="PIZZA" checked={activeTab === 2} onChange={() => handleTabChange(2)} />
                <div role="tabpanel" className="tab-content p-10"
                >
                      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        {
                            pizza.map((item) => {
                                return (
                                    <SingleOrder key={item._id} item={item} />
                                )
                            })
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="SOUPS" checked={activeTab === 3} onChange={() => handleTabChange(3)} />
                <div role="tabpanel" className="tab-content p-10">
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        {
                            soup.map((item) => {
                                return (
                                    <SingleOrder key={item._id} item={item} />
                                )
                            })
                        }
                    </div>
                </div>



                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="DESSERT" checked={activeTab === 4} onChange={() => handleTabChange(4)} />
                <div role="tabpanel" className="tab-content p-10">
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        {
                            dessert.map((item) => {
                                return (
                                    <SingleOrder key={item._id} item={item} />
                                )
                            })
                        }
                    </div>
                </div>


              


            </div>
        </div>
    );
};

export default Order;

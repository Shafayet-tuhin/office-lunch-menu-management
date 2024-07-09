import React, { useState } from 'react'
import SingleMenuItem from '../../Shared/Menu Item/SingleMenuItem'


const MenuCatagory = ({ items }) => {

  const [seeMore , setSeeMore] = useState(false)

    return (
        <div className='mb-32'>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6' >
                {
                  seeMore ? 
                    items.map((item, ind) => {
                        return <SingleMenuItem key={ind} item={item} />
                    }) :
                    items.slice(0,6).map((item, ind) => {
                        return <SingleMenuItem key={ind} item={item} />
                    })
                }
            </div>
            <div className='flex justify-center mt-12'>
                <button onClick={()=> setSeeMore(!seeMore)} style={{ borderRadius: "0.5rem", borderBottom: "3px solid #1F2937" }} className='btn btn-ghost hover:bg-black text-xl font-medium text-[#1F2937] hover:text-orange-400'> { seeMore ? "See Less" : "See More" }</button>
            </div>
        </div>
    )
}

export default MenuCatagory
import React from 'react'

const SingleMenuItem = ({ item }) => {

  const { name, image, recipe, price } = item

  return (
    <div className='flex gap-2'>

      <img style={{borderRadius:"0 12.5rem 10.5rem 12.5rem"}} src={image} alt={name} className='w-[7.37rem] h-[6rem] lg:mr-6'/>
      <div>
        <h1 className='uppercase font-abc font-normal text-base lg:text-xl'>{name} ------------------</h1>
        <p className='text-[#737373] leading-7 lg:text-base text-xs font-normal'>{recipe}</p>
      </div>
      <p className='text-[#BB8506] font-normal lg:text-xl leading-6'>${price}</p>
    </div>
  )
}

export default SingleMenuItem
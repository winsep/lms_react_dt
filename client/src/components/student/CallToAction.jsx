import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Học bất cứ thứ gì, bất cứ lúc nào, bất cứ nơi đâu</h1>
      <p className='text-gray-500 sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Libero facilis placeat rem dolorem omnis.
          <br/>Earum nobis porro nesciunt perferendis 
           quisquam eaque laboriosam voluptatem?</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Bắt đầu</button>
        <button className='flex items-center gap-2'>Tìm hiểu thêm <img src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction
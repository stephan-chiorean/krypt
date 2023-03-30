import React from 'react'
import logo from '../../images/logo.png';

export default() => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32"/>
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>

        </div>

      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">Site built by</p>
        <p className="text-white text-sm text-center">Stevie Productions</p>
      </div>
      
    </div>
  )
}

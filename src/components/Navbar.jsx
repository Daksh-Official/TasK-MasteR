import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-3 bg-rose-900 text-white w-full'>
      <div className="logo font-bold text-lg w-1/3 justify-around flex cursor-pointer ">
      <h2>TasK-MasteR</h2>
      </div>
      <div className="tabs w-1/2 md:w-1/3 cursor-pointer md:text-lg">
        <ul className='flex justify-around'>
            <li className='hover:font-bold duration-200'>Home</li>
            <li className='hover:font-bold duration-200'>Menu</li>
            <li className='hover:font-bold duration-200'>Settings</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

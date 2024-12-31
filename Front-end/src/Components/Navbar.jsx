import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className=' p-10 h-16  w-full bg-transparent flex items-center justify-between fixed'>
       <h1 className='text-white font-serif text-2xl '>INVENTORY</h1>
       <ul className='text-white flex gap-12 font-mono '>
        <li>Home</li>
        <li>Create</li>
        <Link to='/view' ><li>view</li></Link>
       </ul>
    </div>
  )
}

"use client"
import Link from 'next/link'
import React from 'react'
import Searchy from './search'

const Nav  = () => {
  return (
  <nav className="sticky    z-[9999]  bg-slate-900 flex flex-row justify-around w-full  items-center p-2  flex-wrap">

    <Link href={`/`}><h1 className='font-[Fantasy]    text-white text-4xl ' >MovieLovers</h1></Link>
  

    <Searchy/>
 
  
</nav>
)
}

export default Nav

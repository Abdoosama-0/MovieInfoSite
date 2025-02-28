"use client"
import Link from 'next/link'
import React from 'react'
import Searchy from './search'

const Nav  = () => {
  return (
  <nav className="sticky    z-[9999]  bg-slate-900 flex flex-row justify-between w-full items-center p-2 h-[5rem]">

    <Link href={`/`}><h1 className='font-[Fantasy]  text-white text-4xl mx-20' >MovieLovers</h1></Link>
    <Searchy/>
  
</nav>
)
}

export default Nav
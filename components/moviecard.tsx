"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
interface MovieCardProps {
    image: string;
    title: string;
    id:number;
    quality?: string;
    }
const MovieCard = ({ image, title, quality,id }: MovieCardProps) => {

  return (
   
        
       <Link href={`/movies/${id}`}>
        <div className="relative   overflow-hidden group cursor-pointer  w-full 
        aspect-[2/3] bg-slate-950 rounded-2xl ">
        {/* الصورة */}
        <div className="relative w-full h-full">
          <Image 
            src={image || "https://www.shutterstock.com/image-vector/no-image-available-icon-260nw-1069066466.jpg"}
            alt={title} 
            fill 
            sizes={"200px"}
            priority 
            className="object-cover" 
          />
          </div>

      
        {/* تأثير الـ hover عبر before */}
        <div className="absolute inset-0 bg-sky-950 z-[5] opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
    
         {/* جودة الفيلم (الشريط الأحمر) */}
         {quality&&(
         <div className="absolute top-0 left-0 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
         {quality}
       </div>
       )}
    
       {/* اسم الفيلم */}
       <div className="absolute bottom-0 w-full z-10 bg-black bg-opacity-80 h-fit text-white text-center text-sm p-2">
         {title}
       </div>
      </div>
       </Link>
      );
    };
    

export default MovieCard
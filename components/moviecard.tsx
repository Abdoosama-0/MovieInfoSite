import React from 'react'
import Link from 'next/link';
interface MovieCardProps {
    image: string;
    title: string;
    id:number;
    quality?: string;
    }
const MovieCard = ({ image, title, quality,id }: MovieCardProps) => {

  return (
   
        
       <Link href={`/movies/${id}`}>
        <div className="relative w-64 rounded-lg m-2 overflow-hidden group cursor-pointer">
        {/* الصورة */}
        <img src={image} alt={title} className="w-full h-96 object-cover" />
      
        {/* تأثير الـ hover عبر before */}
        <div className="absolute inset-0 bg-sky-950 z-[5] opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
    
         {/* جودة الفيلم (الشريط الأحمر) */}
         {quality&&(
         <div className="absolute top-0 left-0 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
         {quality}
       </div>
       )}
    
       {/* اسم الفيلم */}
       <div className="absolute bottom-0 w-full z-10 bg-black bg-opacity-80 text-white text-center text-sm p-2">
         {title}
       </div>
      </div>
      </Link>
      );
    };
    

export default MovieCard
"use client"
import MovieCard from "@/components/moviecard";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react'

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

type MovieData = Movie[]; 

const Page = () => {
  
  const params = useParams();
  const [movies,setMovies]=useState<MovieData>([])
  const [loading,setLoading]=useState<boolean>(true)

   
  const search1 = Array.isArray(params.Moviesearch) ? params.Moviesearch.join(' ') : (params.Moviesearch || '');
  const search = search1.replace(/ /g, '%20');
  const decodedSearch = search.replace(/%20/g, ' ');

  
  


   useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=caa8300bc818e7643ea53ed6f19509f7&query=${search}
`)
        .then((res)=>res.json())
        .then((data)=>{ 
          setMovies(data.results)
          setLoading(false)
      

        })

   },[])

   const results=movies
  const exiecit= results.length>0
  return (
    <div className="flex flex-col relative h-full w-[95%] mx-auto space-y-4 p-2 border-4 bg-slate-500 bg-opacity-40   rounded-2xl m-2">
      
        <h1 className='h-full text-5xl text-slate-800 border-b-4 p-2 border-white  mb-3'> results of {decodedSearch}</h1>

{loading ?(
<div className="flex flex-row  p-2  rounded-2xl justify-center items-center  flex-wrap">
<h1 className='h-[20rem] text-5xl text-slate-800 p-2   mb-3'>loading...</h1>
</div>
):( 
  exiecit ? (
            <div className="flex flex-row  p-2  rounded-2xl  flex-wrap" >

          { 
          
          results.map((result)=>(
            <span key={result.id}>
             <MovieCard
             image={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
             title={result.title}
             id={result.id}
             />
</span>
          ))}
          </div>
        ):(
          <div className="flex flex-row  p-2  rounded-2xl justify-center items-center  flex-wrap">
<h1 className='h-[20rem] text-5xl text-white p-2   mb-3'>no results</h1>
</div>
        )
        )}

      
</div>
  )
}

export default Page
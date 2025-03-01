"use client"
import Lottie from "lottie-react";
import animationData from "@/animations/Animation - 1740505373902.json";


import { Speech, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'



export default function Movie() {
  useEffect(() => {
    window.scrollTo(0, 0); // يرجّع الصفحة للأعلى عند الدخول
  }, []);

    const { movieId } = useParams();
 
const [loading, setLoading] = useState(true);

//=========================================================
const targetRef = useRef<HTMLIFrameElement | null>(null);

const scrollToSection = () => {
  targetRef.current?.scrollIntoView({ behavior: "smooth" });
};
//=====================================================================================================
interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

const [cast, setCast] = useState<CastMember[]>([]);

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=caa8300bc818e7643ea53ed6f19509f7&language=en-US`)
    .then((res) => res.json())
    .then((data) => {
      setCast(data.cast.slice(0, 8)); 
    });
}, [movieId]);
//=====================================================================================================
const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=caa8300bc818e7643ea53ed6f19509f7&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find((video: { type: string; site: string; }) => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      });
  }, [ movieId]);
//=====================================================================================================
interface Movie {
  title: string;
  poster_path: string;
  genres: { name: string }[];
  overview: string;
  vote_average: number;
  vote_count: number;
}

const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=caa8300bc818e7643ea53ed6f19509f7&language=en-US`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            setMovie(data);

          });
      }, [movieId]);
         
      
        //=====================================================================================================
    return loading? (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={animationData} loop={true} className="w-[15rem] h-[15rem]" />
      </div>
    ): (
      
      
        <main className="relative h-screen ">
  
       {/**======================movie page====================== */}
        <div className=" relative inset-0 flex flex-col    p-4 bg-slate-700 bg-opacity-85 overflow-y-auto   " > {/** المحتوى فوق الصورة */}

            <div className='relative p-3 flex flex-row  border-b-2   '>{/**معلومات عن الفيلم container*/}
                    <div className='flex flex-col '> 
                        <img src={`https://image.tmdb.org/t/p/w500/${movie && movie.poster_path}`} alt={"movie"}  className="w-[24rem] h-[33rem] object-cover rounded-2xl mr-5 mb-3" /> {/**الصورة */}
                        <div className='flex flex-row space-x-2 justify-around mb-4 ml-3  '>
                            <div className='rounded-2xl bg-yellow-600    flex flex-col justify-center px-4 py-3 w-fit font-bold  '>
                                  <div className='flex flex-row items-center space-x-1'>
                                      <h1 className='text-4xl '>imdb </h1> <h1 className='text-3xl items-end'>{movie &&movie.vote_average.toFixed(1)}  </h1> <h1><Star fill="black" color="black" size={40} /></h1>
                                     
                                  </div>

                                  <div className='flex flex-row  items-end space-x-1' >
                                    <h1 className='text-xl'>Votes:</h1>
                                    <h1 className='text-base  flex '>{movie &&movie.vote_count.toLocaleString()}</h1>
                                    <Speech />

              
                                  </div>
                            </div>
                              <div className='bg-slate-950  py-4 px-6 rounded-2xl flex flex-col justify-center hover:bg-slate-800 hover:bg-opacity-50 cursor-pointer '>
                                <h1 onClick={scrollToSection} className='text-3xl text-white font-serif'>trailer</h1>
                              </div>
                          
                        </div>
                    </div> 
                  <div className='flex flex-col p-3 text-white    '> {/**المعلومات */}
                       

                        <div className="flex items-center space-x-3 border-b-4 w-fit rounded-sm p-2 mb-2">
                          <h1 className="text-3xl">Title:</h1>
                          <div className="text-2xl "> 
                            {movie?.title}
                          </div>
                        </div>

                              <div className="flex flex-row space-x-2 items-end   mb-3  ">
                                <h1 className="text-4xl" >Genres:</h1>  
                                
                              <h1  className="text-2xl">{movie?.genres.map((genre,index) =>
                           
                            <span key={index}>
                              {genre.name}{index < movie.genres.length - 1 ? ", " : ""}
                                </span>
                            
                                
                                )}
                                
                                </h1>
                              </div>


                          <div className='flex flex-col mb-3'>
                              <h1 className="text-3xl mb-2" >overview:</h1>
                              <div className='text-2xl  bg-gray-950 bg-opacity-30 p-4 rounded-2xl border-3 border-gray-500'>
                              {movie?.overview}
                              </div>
                          </div>

                          <div className='flex flex-col mb-3 '>
                            <h1 className="text-3xl mb-4 mt-4">cast:</h1>
                            <div className=' bg-gray-950 bg-opacity-30 p-4 rounded-2xl border-3 border-gray-500'>
                                          <div className="flex flex-wrap  gap-9">
                                              {cast.map((actor) => (
                                                <div key={actor.id} className="w-32 text-center">
                                                  <img
                                                    src={
                                                      actor.profile_path
                                                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                                        : "/placeholder.jpg"
                                                    }
                                                    alt={actor.name}
                                                    className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                                                  />
                                                  <p className="text-white text-sm mb-1">{actor.name}</p>
                                                  <p className="text-gray-300 text-xs border-2 rounded-full mb-4 p-1">as {actor.character}</p>
                                            </div> ))}
                                                    
                          </div>
                              </div>
                          </div>

                  </div>

                


            </div>


            <div  className="flex flex-col  mt-4  mb-8 ">  {/**video container*/}
              <h1 className="text-3xl text-cyan-50   w-fit mb-4">Trailer:</h1>

              <div className="relative flex justify-center items-center  mx-auto w-[1400px] h-[700px] rounded-xl bg-black overflow-hidden">
                  <h1 className='absolute  font-bold z-10 text-3xl text-white'> loading.....</h1>
                  <iframe className="absolute  z-20 w-full h-full  " ref={targetRef}
                  
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    allowFullScreen
                    
                  ></iframe>
              </div>
            </div>




          

           
        </div>

        {/**============================================ */}


        </main>
    
  )
}


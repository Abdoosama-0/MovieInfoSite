"use client"
import Lottie from "lottie-react";
import animationData from "@/animations/Animation - 1740505373902.json";


import { Speech, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';


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
  }, [movieId]);
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
  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={animationData} loop={true} className="w-[15rem] h-[15rem]" />
    </div>
  ) : (


    <main className="relative  flex flex-col bg-slate-500 bg-opacity-50 ">

      {/**======================movie page====================== */}


      <div className='relative p-3  flex flex-col xl:flex-row  border-b-2  '>{/**معلومات عن الفيلم container*/}

        <div className='flex flex-col p-2 gap-2  h-[44rem] mx-auto w-full max-w-[25rem] xl:mx-0 xl:h-[44rem] xl:w-full xl:max-h-[44rem] '> {/** اصورة والتقيم*/}

          <div className="w-full h-full  xl:w-full xl:h-full   relative rounded-lg overflow-hidden ">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie && movie.poster_path}`} // تأكد من أن الصورة موجودة في المجلد public 
              alt="movie"
              layout="fill" // يجعل الصورة تملأ الـ div بالكامل
              objectFit="cover"// يحافظ على تناسب الصورة ويملأ الحاوية
              className="object-cover "
            />
          </div>



          <div className='flex flex-row justify-around w-full gap-1 max-w-full '>

            <div className='rounded-2xl bg-yellow-600    flex flex-col justify-center px-4 py-3 w-full font-bold  '>
              <div className='flex flex-row items-center space-x-1 w-full'>
                <h1 className='text-4xl '>imdb </h1> <h1 className='text-3xl items-end'>{movie && movie.vote_average.toFixed(1)}  </h1> <h1><Star fill="black" color="black" size={40} /></h1>

              </div>

              <div className='flex flex-row  items-end space-x-1' >
                <h1 className='text-xl'>Votes:</h1>
                <h1 className='text-base  flex '>{movie && movie.vote_count.toLocaleString()}</h1>
                <Speech />


              </div>
            </div>
            <div onClick={scrollToSection} className='bg-slate-950  py-4 px-6 rounded-2xl flex flex-col justify-center w-full hover:bg-slate-800 hover:bg-opacity-50 cursor-pointer '>
              <h1 className='text-3xl text-white w-fit font-serif'>trailer</h1>
            </div>

          </div>
        </div>



        <div className='flex flex-col p-3 text-white xl:overflow-x-auto    '> {/**المعلومات */}


          <div className="flex items-center space-x-3 border-b-4 w-fit rounded-sm p-2 mb-2">
            <h1 className="text-3xl">Title:</h1>
            <div className="text-2xl ">
              {movie?.title}
            </div>
          </div>

          <div className="flex flex-row space-x-2 items-end   mb-3  ">
            <h1 className="text-4xl" >Genres:</h1>

            <h1 className="text-2xl">{movie?.genres.map((genre, index) =>

              <span key={index}>
                {genre.name}{index < movie.genres.length - 1 ? ", " : ""}
              </span>


            )}

            </h1>
          </div>


          <div className='flex flex-col mb-3'>
            <h1 className="text-3xl mb-2" >overview:</h1>
            <div className='text-2xl flex flex-wrap bg-gray-950 bg-opacity-30 p-4 rounded-2xl'>
              {movie?.overview}
            </div>
          </div>

          <div className='flex flex-col mb-3  w-full xl:overflow-x-auto'>
            <h1 className="text-3xl mb-4 mt-4 w-fit ">cast:</h1>
            <div className=' bg-slate-950 bg-opacity-30 p-4 rounded-2xl  flex flex-row gap-5  w-full flex-wrap xl:flex-nowrap  xl:overflow-x-auto'>

              {cast.map((actor) => (
                <div key={actor.id} className=" w-fit min-w-12 text-center ">
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                          : "/placeholder.jpg"
                      }
                      alt={actor.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="96px" 
                    />
                  </div>
                  <p className="text-white text-sm w-full mb-1">{actor.name}</p>
                  <p className="text-gray-300 text-xs w-full border-2 rounded-full mb-4 p-1">as {actor.character}</p>
                </div>


              ))}


            </div>
          </div>

        </div>




      </div>


      <div className="flex flex-col  mt-4  mb-8  mx-4 ">  {/**video container*/}
        <h1 className="text-3xl text-cyan-50   w-fit mb-4">Trailer:</h1>

        <div className="relative flex justify-center items-center mx-auto w-full max-w-[1400px] aspect-[16/9] rounded-xl bg-black overflow-hidden">
          <h1 className='absolute font-bold z-10 text-3xl text-white'>loading.....</h1>
          <iframe
            className="absolute z-20 w-full h-full"
            ref={targetRef}
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allowFullScreen
          ></iframe>
        </div>

      </div>









      {/**============================================ */}


    </main>

  )
}


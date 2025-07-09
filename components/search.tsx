"use client"

import { Search } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';





const Searchy = () => {


  const router = useRouter();


  const numberOfPages = 500;
  const [loading, setLoading] = useState<boolean>(true)

  interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }

  const [data, setData] = useState<Movie[]>([]);
  const fetchMovies = async () => {
   if(data.length > 0){

    return} ; 
    const requests = Array.from({ length: numberOfPages }, (_, i) =>
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=caa8300bc818e7643ea53ed6f19509f7&language=en-US&page=${i + 1
        }`
      ).then((res) => res.json())
    );
    console.log("Fetched data3:");
    const results = await Promise.all(requests);
    const allMovies = results.flatMap((res) => res.results || []);
    setData(allMovies);
    setLoading(false)

  };


  const pathname = usePathname();

  useEffect(() => {
    setSearchValue(""); // إعادة تعيين القيمة عند تغيير الـ URL
  }, [pathname]); // يتم تنفيذ `useEffect` عند تغيير `as



  //=====================================================

  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredWords1 = data.filter((result) => result.title.toLowerCase().includes(searchValue.toLowerCase()));
  const filteredWords = filteredWords1.slice(0, 4)

  //=====================================================




  //===================================================================================================================\


  return (
    <>




      <div className={`hidden relative w-fit sm:flex ml-24 sm:ml-0 flex-row justify-center p-1  rounded-full sm:w-3/5 items-center  sm:border-2  sm:py-1 sm:px-4  sm:space-x-2 z-50  bg-transparent sm:bg-slate-100 bg-opacity-100 ${onSearch && "sm:first-line:bg-white sm:bg-opacity-100"} `}>

        <input className='sm:flex   placeholder-blue-950 placeholder:text-base placeholder:font-bold placeholder-opacity-50 outline-none bg-transparent text-black w-full h-full text-2xl font-bold'
          placeholder='search for a movie' type="text "
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() => { fetchMovies(); setOnSearch(true) }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchValue.trim()) {
              setOnSearch(false);
              router.push(`/movies/search/${searchValue.trim()}`);
            }
          }}
        />


        <button onClick={() => {
          if (!searchValue) return;
          setOnSearch(false);
        }}>
          {searchValue ? (
            <Link href={`/movies/search/${searchValue}`}>
              <Search size={44} className="text-white sm:text-black" />
            </Link>
          ) : (
            <Search size={44} className="text-white sm:text-black" />
          )}
        </button>

        {searchValue && onSearch && (
          loading ? (
            <div className={`absolute left-auto top-[3rem] mt-2  flex items-center justify-center  z-20 w-[100%] h-[20rem]  rounded-2xl bg-white `}>
              <h1 className='font-bold text-3xl text-black '>loading...</h1>
            </div>
          ) : (


            // ==================================================================

            <div className='top-[3rem] mt-3 left-2 w-[70%] absolute sm:left-auto sm:top-[3rem]  sm:mt-2   z-20 sm:w-[100%]  rounded-2xl bg-white '>

              {filteredWords.length > 0 ? (
                <div className='   rounded-xl py-6 px-2 w-full  flex-col overflow-y-auto  h-[31rem] xl:h-[31rem]  t max-h-[44rem]  '>

                  <h1 className=' mb-2 ml-1'> Popular Results</h1>

                  <div className=' '>
                    {filteredWords.map((result, index) => (

                      <Link key={index} href={`/movies/${result.id}`} >
                        <div
                          onClick={() => { setOnSearch(false); setSearchValue("") }}
                          className='rounded-sm p-2 m-1  border-b-4 cursor-pointer mb-2 hover:bg-slate-500 hover:bg-opacity-50'>
                          <div className='flex flex-row space-x-3  '>


                            <Image src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title}
                              height={96} width={64} className=" rounded-lg object-cover" />

                            <h1 className='font-bold text-xl md:text-2xl flex items-end'>{result.title}</h1>
                          </div>

                        </div>
                      </Link>

                    ))}
                  </div>

                  <h1 className=' bg-black rounded-2xl p-2  text-xl md:text-3xl text-white w-fit mt-2 mx-auto'
                    onClick={() => { setOnSearch(false); setSearchValue("") }}>
                    <Link href={`/movies/search/${searchValue}`}
                    >
                      watch all results
                    </Link>
                  </h1>




                </div>

              ) : (
                <div className='bg-white rounded-sm py-10 px-2 w-full  h-fit  flex flex-col text-4xl font-bold'>
                  <h1 className='text-sm border-b-2 border-black'>nothing popular</h1>
                  <div className='bg-white rounded-sm py-10 px-2 w-full  h-fit  items-center justify-center flex flex-col text-4xl font-bold'>
                    <h1 className=' bg-black rounded-2xl p-2  text-3xl text-white w-fit mt-2 mx-auto'
                      onClick={() => { setOnSearch(false) }}>
                      <Link href={`/movies/search/${searchValue}`}>
                        watch all results
                      </Link>
                    </h1></div>

                </div>)
              }


            </div>

          )
        )}




      </div>

      {onSearch && (
        <div className='absolute sm:hidden flex justify-between items-center left-auto top-0 rounded-2xl mt-1  w-[92%] h-[93%]  bg-white z-[100] p-2   '>
          <input className='  placeholder-blue-950 placeholder:text-base placeholder:font-bold placeholder-opacity-50 outline-none bg-transparent text-black w-full h-full text-2xl font-bold'
            placeholder='search for a movie' type="text "
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => setOnSearch(true)}
          />


          {/**================fun search value onSearch  loading filteredWords================= */}
          {searchValue && onSearch && (
            loading ? (
              <div className={`absolute top-[3rem] mt-2  flex items-center justify-center  z-20 w-[95%] h-[20rem]  rounded-2xl bg-white `}>
                <h1 className='font-bold text-3xl text-black '>🧊loading...🧊</h1>
              </div>
            ) : (
              <div className='top-[3rem] mt-2  w-[95%] absolute    z-20   rounded-2xl bg-white h-[31rem] overflow-y-auto'>

                {filteredWords.length > 0 ? (
                  <div className='   rounded-xl py-2 px-2 w-full  flex-col overflow-y-auto  h-fit max-h-[44rem]  '>

                    <h1 className=' mb-2 ml-1 text-sm'> Popular Results</h1>

                    <div className=' '>
                      {filteredWords.map((result, index) => (

                        <Link key={index} href={`/movies/${result.id}`} >
                          <div
                            onClick={() => { setOnSearch(false); setSearchValue("") }}
                            className='rounded-sm p-2 m-1  border-b-4 cursor-pointer mb-2 hover:bg-slate-500 hover:bg-opacity-50'>
                            <div className='flex flex-row space-x-3  '>


                              <Image src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} 
                              alt={result.title}
                                height={82} width={50} 
                                
                                className=" rounded-lg object-cover" />

                              <h1 className='font-bold text-sm  flex items-end'>{result.title}</h1>
                            </div>

                          </div>
                        </Link>

                      ))}
                    </div>

                    <h1 className=' bg-black rounded-2xl p-2  text-sm text-white w-fit mt-2 mx-auto'
                      onClick={() => { setOnSearch(false); setSearchValue("") }}>
                      <Link href={`/movies/search/${searchValue}`}
                      >
                        watch all results
                      </Link>
                    </h1>




                  </div>

                ) : (
                  <div className='bg-white rounded-sm py-10 px-2 w-full  h-fit  flex flex-col text-4xl font-bold'>
                    <h1 className='text-sm border-b-2 border-black'>nothing popular</h1>
                    <div className='bg-white rounded-sm py-10 px-2 w-full  h-fit  items-center justify-center flex flex-col text-4xl font-bold'>
                      <h1 className=' bg-black rounded-2xl p-2  text-3xl text-white w-fit mt-2 mx-auto'
                        onClick={() => { setOnSearch(false) }}>
                        <Link href={`/movies/search/${searchValue}`}>
                          watch all results
                        </Link>
                      </h1></div>

                  </div>)
                }


              </div>
            )
          )}
          {/**================================= */}
        </div>
      )
      }


      <div className=' flex sm:hidden justify-end items-end ml-20 sm:ml-0  ' >
        <button onClick={() => { setOnSearch(true) }}>

          <Search size={40} color='white' />

        </button>

      </div>

      {/**=========================================================================================================== */}
      <div >
        {onSearch && (
          <div className='fixed inset-0 bg-slate-900 bg-opacity-95 z-40'
            onClick={() => setOnSearch(false)}
          >
          </div>
        )}

      </div>


    </>

  )
}

export default Searchy

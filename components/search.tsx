
import { button, div, h1 } from 'framer-motion/client';
import Lottie from 'lottie-react';
import {  Search } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


//======================================================================

  const Searchy = () => {
   //=====================================================
  
    const numberOfPages = 500;
    const [loading,setLoading]=useState<boolean>(true)
    const [data, setData] = useState<any[]>([]);
 
    useEffect(() => {
        //================================================================================================
      const fetchMovies = async () => {
        const requests = Array.from({ length: numberOfPages }, (_, i) =>
          fetch( 
            `https://api.themoviedb.org/3/movie/top_rated?api_key=caa8300bc818e7643ea53ed6f19509f7&language=en-US&page=${
              i + 1
            }`
          ).then((res) => res.json())
        );
  
        const results = await Promise.all(requests);
        const allMovies = results.flatMap((res) => res.results || []);
        setData(allMovies);
        setLoading(false)

      };
      //===========================================================
      fetchMovies();
    }, []);





   //=====================================================
    
const [onSearch, setOnSearch] = useState<boolean>(false);
 const [searchValue, setSearchValue] = useState<string>('');

const filteredWords1 = data.filter((result) => result.title.toLowerCase().includes(searchValue.toLowerCase()));
const filteredWords = filteredWords1.slice(0,4)

//=====================================================

//============================================search========================================================================\


//===================================================================================================================\


  return (
   <>


                
        
        <div className={`relative flex flex-row justify-center  rounded-full w-3/5 items-center  border-2  py-1 px-4  space-x-2 z-50  bg-slate-100 bg-opacity-100 ${onSearch&& "bg-white border-x-zinc-700 bg-opacity-100"} `}>
           
            <input className='placeholder-blue-950 placeholder:text-base placeholder:font-bold placeholder-opacity-50 outline-none bg-transparent text-black w-full h-full text-2xl font-bold'
             placeholder='search for a movie' type="text "
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}  
            onClick={()=>setOnSearch(true)}
            />
            
            <button onClick={()=>{setOnSearch(false)}}>  <Link  href={`/movies/search/${searchValue}`} >
                <Search size={44}/> </Link>
                </button>

            {searchValue&& onSearch &&(
              loading?(
                <div className={`absolute left-auto top-[3rem] mt-2  flex items-center justify-center  z-20 w-[100%] h-[20rem]  rounded-2xl bg-white `}>
                <h1 className='font-bold text-3xl text-black '>loading...</h1>
                </div>
            ):(

              
              // ==================================================================

                <div className='absolute left-auto top-[3rem] mt-2   z-20 w-[100%]  rounded-2xl bg-white '> 

                    {filteredWords.length>0 ?(
                        <div className='   rounded-xl py-6 px-2 w-full  flex-col overflow-y-auto  h-fit max-h-[44rem]  '>
                                      
                                      <h1 className=' mb-2 ml-1'> Popular Results</h1>
                                      
                                        <div className=' '>
                                        {filteredWords.map((result) => (
                                                   
                                                <Link  href={`/movies/${result.id}`} >
                                                    <div 
                                                    onClick={() => {setOnSearch(false) ; setSearchValue("")}}
                                                    className='rounded-sm p-2 m-1  border-b-4 cursor-pointer mb-2 hover:bg-slate-500 hover:bg-opacity-50'>
                                                        <div className='flex flex-row space-x-3  '>
                                                        <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title} className=" h-[6rem] rounded-lg object-cover" />
                                                        <h1 className='font-bold text-3xl flex items-end'>{result.title}</h1>
                                                        </div>
                                                       
                                                    </div>
                                                </Link>
                                                
                                                ))}
                                                </div>

                                                <h1       className=' bg-black rounded-2xl p-2  text-3xl text-white w-fit mt-2 mx-auto'
                                                onClick={()=>{setOnSearch(false) ; setSearchValue("") }}>  
                                                <Link  href={`/movies/search/${searchValue}`}
                                          >
                                                  watch all results
                                                </Link>
                                                </h1>
                                     

                          
                             
                                          </div>
                    
                    ):(
                    <div className='bg-white rounded-sm py-10 px-2 w-full  h-fit  flex flex-col text-4xl font-bold'> 
                    <h1 className='text-sm border-b-2 border-black'>nothing popular</h1>  
                    <div className='bg-white rounded-sm py-10 px-2 w-full  h-fit  items-center justify-center flex flex-col text-4xl font-bold'>
                    <h1       className=' bg-black rounded-2xl p-2  text-3xl text-white w-fit mt-2 mx-auto'
                    onClick={()=>{setOnSearch(false)}}>  
                    <Link  href={`/movies/search/${searchValue}`}>
                      watch all results
                    </Link>
                    </h1></div>
                    
                    </div> )
                    } 
                    

                </div>

)
            )}

       
        </div>
      
{/**=========================================================================================================== */}
             <div >
                    {onSearch && (
                    <div className='fixed inset-0 bg-slate-900 bg-opacity-95 z-40'
                    onClick={()=>setOnSearch(false)}
                    >
           
            </div>
          )}
         
             </div>
    

</>

  )
}

export default Searchy
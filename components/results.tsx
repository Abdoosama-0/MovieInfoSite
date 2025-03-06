import Link from 'next/link';
import React from 'react'

interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }
interface ResultsProps{
    searchValue:string, 
     onSearch :boolean 
     loading :boolean
     filteredWords:Movie[]
     setOnSearch: (value: boolean) => void;
     setSearchValue: (value: string) => void;
     
     
}
const Results: React.FC<ResultsProps> = ({ searchValue, onSearch, loading, filteredWords }) => {
  return (
    <>
           {searchValue&& onSearch &&(
              loading?(
                <div className={`absolute left-auto top-[3rem] mt-2  flex items-center justify-center  z-20 w-[100%] h-[20rem]  rounded-2xl bg-white `}>
                <h1 className='font-bold text-3xl text-black '>loading...</h1>
                </div>
            ):(
            <div className='top-[3rem] mt-2 left-5 w-[95%] absolute    z-20   rounded-2xl bg-white '> 

                  {filteredWords.length>0 ?(
                      <div className='   rounded-xl py-6 px-2 w-full  flex-col overflow-y-auto  h-fit max-h-[44rem]  '>
                                    
                                    <h1 className=' mb-2 ml-1'> Popular Results</h1>
                                    
                                      <div className=' '>
                                      {filteredWords.map((result ,index) => (
                                                
                                              <Link key={index} href={`/movies/${result.id}`} >
                                                  <div 
                                                  onClick={() => {setOnSearch(false) ; setSearchValue("")}}
                                                  className='rounded-sm p-2 m-1  border-b-4 cursor-pointer mb-2 hover:bg-slate-500 hover:bg-opacity-50'>
                                                      <div className='flex flex-row space-x-3  '>
                                                        

                                                      <Image src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title}
                                                      height={96} width={64} className=" rounded-lg object-cover" />

                                                      <h1 className='font-bold text-xl md:text-3xl flex items-end'>{result.title}</h1>
                                                      </div>
                                                    
                                                  </div>
                                              </Link>
                                              
                                              ))}
                                              </div>

                                              <h1       className=' bg-black rounded-2xl p-2  text-xl md:text-3xl text-white w-fit mt-2 mx-auto'
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
    
    
    </>
  )
}

export default Results

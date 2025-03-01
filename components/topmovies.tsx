


"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "./moviecard";

interface MovieData {
  results: Array<{
    id: number;
    poster_path: string;
    title: string;
  }>;
}

// ================================================================
// Component to handle search params inside Suspense
// ================================================================
function SearchParamsHandler({ onPageChange }: { onPageChange: (page: number) => void }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  return null; // This component is only for handling search params
}

// ===========================================================================
// Main Component
// ===========================================================================
export default function TopMovies() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const targetRef = useRef<HTMLDivElement>(null);

  const changePage = (newPage: number) => {
    router.push(`?page=${newPage}`, { scroll: false });
    setLoading(true);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=caa8300bc818e7643ea53ed6f19509f7&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [page]);

  const scrollToSection = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={targetRef} className="flex justify-center">
      <div className="border-4 rounded-2xl p-3 bg-slate-500 bg-opacity-50 w-[95%]">
        <div className="flex border-b-4 text-4xl font-serif text-white p-2 shadow-lg">Best Movies</div>

        <Suspense fallback={<div className="text-white font-bold text-4xl mx-auto mt-5">Loading...</div>}>
          <SearchParamsHandler onPageChange={setPage} />
        </Suspense>

        <div className="flex flex-row flex-wrap">
          {loading ? (
            <h1 className="text-white font-bold text-4xl mx-auto mt-5 h-[100rem]">loading...</h1>
          ) : (
            <div className="flex flex-row h-fit mt-2 flex-wrap">
              {data &&
                data.results.map((movie, index) => (
                  <span key={index}>
                    <MovieCard
                      image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      title={movie.title}
                      quality="1080p WEB-D"
                      id={movie.id}
                    />
                  </span>
                ))}
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center space-x-2 mt-4">
          {page > 1 && (
            <button
              className="bg-black hover:bg-gray-800 hover:bg-opacity-50 w-2/12 rounded-xl mb-8 h-8 text-white"
              onClick={() => {
                changePage(page - 1);
                scrollToSection();
              }}
            >
              Previous
            </button>
          )}
          <button
            className="bg-black hover:bg-gray-800 hover:bg-opacity-50 w-2/12 rounded-xl mb-8 h-8 text-white"
            onClick={() => {
              changePage(page + 1);
              scrollToSection();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}















//===========================================================================================================
// "use client"

// import { Suspense } from "react";
// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from "next/navigation";
// import MovieCard from './moviecard';



// //==========================================================================================================================================
// export default function TopMovies()  {
  
  

// //================================================fetch data==============================================================
//     const SearchParams = useSearchParams();
//     const router=useRouter();
  
//   const page = parseInt(SearchParams.get('page') || '1');

//   interface MovieData {
//     results: Array<{
//       id: number;
//       poster_path: string;
//       title: string;
//     }>;
//   }

//   const [data, setData] = useState<MovieData | null>(null);
//   const [loading, setLoading] = useState(true);

//   const changePage = (newPage:number) => {

//     router.push(`?page=${newPage}`,{scroll:false})
      
//   } 

//   useEffect(() => {
    
//     fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=caa8300bc818e7643ea53ed6f19509f7&language=en-US&page=${page}`)  
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       });
//   }, [page]);

//   const targetRef = useRef<HTMLDivElement>(null);

//   const scrollToSection = () => { 
     
  
//     targetRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
// //==============================================================================================================

//   return  (
// <div  ref={targetRef} className="flex justify-center">
//     <div  className='border-4 rounded-2xl p-3 bg-slate-500 bg-opacity-50 w-[95%] '> 
//         <div className="flex border-b-4 text-4xl font-serif    text-white p-2 shadow-lg">
//         Best Movies
//         </div>
 
 


//         <div className='flex  flex-row   flex-wrap '>{/** movies*/}{/**h-[100rem]  */}
//         {loading? (<h1 className="text-white font-bold text-4xl  mx-auto mt-5 h-[100rem]">loading...</h1>):(       
//            <div className='flex flex-row   h-fit  mt-2 flex-wrap ' >
//             {data && data.results.map((movie,index) => (//.slice(0,6)
//                      <span key={index}>
//             <MovieCard
//                     image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//                     title={movie.title}
//                     quality="1080p WEB-D"   
//                     id={movie.id} 
//             />
//           </span>  
//             ))}
//             </div> 

// )}

//         </div>
 

//         <div className="flex flex-row justify-center space-x-2 mt-4">
//             {page > 1 && (
//             <button className='bg-black  hover:bg-gray-800 hover:bg-opacity-50 w-2/12 rounded-xl mb-8 h-8 text-white ' onClick={() => {changePage(page - 1)  ;  setLoading(true) ;scrollToSection()}}>Previous</button>

//         )}
//             <button className='bg-black  hover:bg-gray-800 hover:bg-opacity-50 w-2/12 rounded-xl mb-8 h-8 text-white  ' onClick={() =>{
//           changePage(page + 1) ;  setLoading(true) ;scrollToSection()
           
//                }}>Next</button>
               
//             </div>
      
//     </div>

// </div>
//   );
  
// }

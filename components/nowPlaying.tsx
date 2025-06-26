"use client"


import React, { useEffect, useState } from "react";
import MovieCard from "./moviecard";



type Movie = {
  id: number;
  poster_path: string;
  title: string;
};

type MovieData = Movie[]; // Array of movie objects



export default function NowPlaying() {
  const [data, setData] = useState<MovieData>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [startIndex, setStartIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);


  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=caa8300bc818e7643ea53ed6f19509f7`)
      const data = await res.json();
      if (!res.ok) {
        alert(data.message)
        return
      }

      setData(data.results);




    } catch (error) {
      console.error("Error fetching data:", error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])






  //=================================================================================================

  const getVisibleMovies = (visibleItems:number) => {
    
    const endIndex = startIndex + visibleItems;

    return endIndex <= data.length
      ? data.slice(startIndex, endIndex) // الحالة العادية
      : [...data.slice(startIndex), ...data.slice(0, endIndex % data.length)]; // عند تجاوز النهاية، يتم الدمج مع البداية
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % data.length);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex - itemsPerPage + data.length) % data.length);
  };
  //=================================================================================================
 
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(6);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(2);
      }
    };
    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage); //كل ما المستخدم يغير حجم نافذة المتصفح (يكبر أو يصغر)، نفذ الدالة updateItemsPerPage
    return () => window.removeEventListener("resize", updateItemsPerPage);// إزالة المستمع (listener) لما ميبقاش محتاجه   *(cleanup function)*
  }, []);
  //=================================================================================================





  return (



    <div className="flex flex-col  bg-slate-700 bg-opacity-50 border-4 p-5  rounded-2xl space-y-2 mb-3">

      <h1 className="text-white font-bold text-4xl border-b-4 p-2 ml-4 ">now playing</h1>


      {loading ? (<div className="loader mx-auto m-10"></div>) : (
        <div className="flex flex-row gap-1 w-full justify-between items-center">
          <button onClick={handlePrevious} className="text-white  h-full">◀</button>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-center w-full   mb-4  h-fit">



            {getVisibleMovies(itemsPerPage).map((result, index) => (//0 to 6  => 0 1 2 3 4 5 =>6 items >>>>>> 6 ,12 =>  6 7 8  9 10 11 
              <span key={index}>
                <MovieCard
                  image={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  title={result.title}
                  id={result.id}
                />
              </span>
            )
            )}
          </div>

          <button onClick={handleNext} className="text-white  h-full ">▶</button>

        </div>
      )}

    </div>
  );
}


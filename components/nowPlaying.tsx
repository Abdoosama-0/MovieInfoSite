"use client"


import React, { useEffect, useState } from "react";
import MovieCard from "./moviecard";



//=================================================================================================




//==================================================fetch object===============================================

interface MovieData {
 
  results: Array<{
    id: number;
    poster_path: string;
    title: string;
  }>;
  
  }
  


export default function NowPlaying() {
  const [data,setData]=useState<MovieData>({ results: [] })
  const [loading,setLoading]=useState<boolean>(true)


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=caa8300bc818e7643ea53ed6f19509f7`)  
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    });

  },[])
const movies =data.results

  //=================================================العناصر التى سوف تعرض================================================
  const [startIndex, setStartIndex] = useState<number>(0);
 
  const visibleItems = 6;
  

  //===============================================================
  
// دالة لجلب العناصر الحالية مع إعادة التدوير
const getVisibleMovies = () => {
  const endIndex = startIndex + visibleItems;

  return endIndex <= movies.length
    ? movies.slice(startIndex, endIndex) // الحالة العادية
    : [...movies.slice(startIndex), ...movies.slice(0, endIndex % movies.length)]; // عند تجاوز النهاية، يتم الدمج مع البداية
};

const handleNext = () => {
  setStartIndex((prevIndex) => (prevIndex + visibleItems) % movies.length);
};

const handlePrevious = () => {
  setStartIndex((prevIndex) => (prevIndex - visibleItems + movies.length) % movies.length);
};
//=================================================================================================
useEffect(() => {
  if (movies.length <= visibleItems) return; // لا تجعل المؤقت يعمل إذا لم يكن هناك عدد كافٍ من الأفلام

  const interval = setInterval(() => {
    setStartIndex((prevIndex) => (prevIndex + visibleItems) % movies.length);
  }, 4000);

  return () => clearInterval(interval);
}, [movies.length, visibleItems]); 

//=================================================================================================


const [itemsPerPage, setItemsPerPage] = useState(2);

useEffect(() => {
  const updateItemsPerPage = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerPage(6); // شاشات كبيرة
    } else if (window.innerWidth >= 768) {
      setItemsPerPage(3); // شاشات متوسطة
    } else {
      setItemsPerPage(2); // شاشات صغيرة
    }
  };

  updateItemsPerPage(); // تشغيل عند التحميل
  window.addEventListener("resize", updateItemsPerPage);

  return () => window.removeEventListener("resize", updateItemsPerPage);
}, []);



return (


  
<div className="flex flex-col  bg-slate-700 bg-opacity-50 border-4 p-5  rounded-2xl space-y-2 mb-3">
    
      <h1 className="text-white font-bold text-4xl border-b-4 p-2 ml-4 ">now playing</h1>

  
    {loading? (<h1 className="text-white font-bold text-4xl mx-auto p-40">loading...</h1>):(
      <div className="flex flex-row gap-1 w-full justify-between items-center"> 
          <button onClick={handlePrevious} className="text-white  h-full">◀</button>
      
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-center w-full   mb-4  h-fit">

            
              
            {getVisibleMovies().slice(0,itemsPerPage).map((result,index)=>(//0 to 6  => 0 1 2 3 4 5 =>6 items >>>>>> 6 ,12 =>  6 7 8  9 10 11 
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


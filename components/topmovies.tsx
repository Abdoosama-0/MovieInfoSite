


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



  };

  const fetchMovies = async (page: number) => {

      const cacheKey = `topRated-${page}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    setData(JSON.parse(cached));
    setLoading(false);
    return;
  }
    try {
     
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`
      )
      const data = await res.json();
      console.log("Fetched data1:");
      if (!res.ok) {
        alert(data.message ||"Failed to fetch data" );
        return;
      }

      setData(data);
       sessionStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Failed to fetch data. Please try again later.");


    } finally {
      setLoading(false);
    }

  }


  useEffect(() => {
    setLoading(true);

    fetchMovies(page);


  }, [page]);

  const scrollToSection = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={targetRef} className="flex justify-center">
      <div className="min-h-screen border-4 rounded-2xl p-3 bg-slate-500 bg-opacity-50 w-[100%]">
        <div className="flex border-b-4 text-4xl font-serif text-white p-2 shadow-lg">Best Movies</div>

        <Suspense fallback={<div className="text-white font-bold text-4xl mx-auto mt-5">Loading...</div>}>
          <SearchParamsHandler onPageChange={setPage} />
        </Suspense>

        {/* <div className="flex flex-row flex-wrap bg-orange-500 m-2"> */}
        {loading ? (

          <div className="loader mx-auto m-10"></div>


        ) : (
          <>
            <div className=" m-2 flex-wrap
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3"> {/**movies */}


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
            <div className="flex flex-row justify-center  w-[80%] md:w-fit mx-auto p-4   space-x-2 mt-4 mb-8 text-white font-bold text-xl">
              {page > 1 && (
                <button
                  className="bg-black hover:bg-gray-800 hover:bg-opacity-50 w-full p-1 px-5  rounded-xl  "
                  onClick={() => {
                    changePage(page - 1);
                    scrollToSection();
                  }}
                >
                  Previous
                </button>
              )}
              <button
                className="bg-black hover:bg-gray-800 hover:bg-opacity-50 w-full p-1 px-5   rounded-xl   "
                onClick={() => {

                  changePage(page + 1);
                  scrollToSection();
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
        {/* </div> */}


      </div>
    </div>
  );
}















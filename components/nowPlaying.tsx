"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "./moviecard";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
};

export default function NowPlaying() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);


  const fetchMovies = async () => {

    const cached = sessionStorage.getItem("nowPlaying");
    if (cached) {
      setMovies(JSON.parse(cached));
      setLoading(false);
      return;
    }
    try {

      console.log("Fetched data2:");
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch data");
        return;
      }

      setMovies(data.results);
      sessionStorage.setItem("nowPlaying", JSON.stringify(data.results));
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    setItemsPerPage(width >= 1024 ? 6 : width >= 768 ? 3 : 2);
  };
  useEffect(() => {
    updateItemsPerPage();
    fetchMovies();

    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);


  useEffect(() => {
    if (movies.length === 0) return;


    const endIndex = startIndex + itemsPerPage;
    const sliced =
      endIndex <= movies.length
        ? movies.slice(startIndex, endIndex)
        : [...movies.slice(startIndex), ...movies.slice(0, endIndex % movies.length)];

    setVisibleMovies(sliced);
  }, [movies, startIndex, itemsPerPage]);

  const handleNext = () => {
    setStartIndex((prev) => (prev + itemsPerPage) % movies.length);
  };

  const handlePrevious = () => {
    setStartIndex((prev) => (prev - itemsPerPage + movies.length) % movies.length);
  };

  return (
    <div className="flex flex-col bg-slate-700 bg-opacity-50 border-4 p-5 rounded-2xl space-y-2 mb-3 min-h-[300px]">
      <h1 className="flex border-b-4 text-4xl font-serif text-white p-2 shadow-lg">
        <div className="flex justify-between items-center  w-full">now playing <p className="text-sm  text-white text-opacity-50">{itemsPerPage}</p></div>
      </h1>


      {loading ? (
        <div className="loader mx-auto" />
      ) : (
        <div className="flex flex-row gap-1 w-full justify-between items-center">
          <button onClick={handlePrevious} className="text-white h-full">
            ◀
          </button>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-center w-full mb-4 h-fit">
            {visibleMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                id={movie.id}
              />
            ))}
          </div>

          <button onClick={handleNext} className="text-white h-full">
            ▶
          </button>
        </div>
      )}

    </div>
  );
}

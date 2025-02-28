"use client"


import TopMovies from "@/components/topmovies";
import NowPlaying from "@/components/nowPlaying";


import { useEffect, useState } from "react";



import {  useSearchParams } from "next/navigation";
import Searchy from "@/components/search";

import Lottie from "lottie-react";
import animationData from "@/animations/Animation - 1740505373902.json";
import { object } from "framer-motion/client";




export default function Home() {
  //==================================================================================================================

//=========================================================================================================================
  return (

 
 //====================background===========================
    <main className="relative h-screen">
      {/* * خلفية الصورة
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/1315629.png')" }}
      /> */}
{/**==========content================================================= */}
     
<div className="relative inset-0 flex   space-y-4 flex-col p-2 bg-slate-500 bg-opacity-40   " >
        
      

          

            <NowPlaying />
  
            <TopMovies 
          
            />


            
      </div>

    </main>
   
  );
}


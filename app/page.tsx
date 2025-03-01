


import TopMovies from "@/components/topmovies";
import NowPlaying from "@/components/nowPlaying";




export default function Home() {
  //==================================================================================================================

//=========================================================================================================================
  return (

 
 //====================background===========================
    <main className="relative h-screen">
    
{/**==========content================================================= */}
     
<div className="relative inset-0 flex   space-y-4 flex-col p-2 bg-slate-500 bg-opacity-40   " >
        
      

          

            <NowPlaying />
  
            <TopMovies 
          
            />


            
      </div>

    </main>
   
  );
}


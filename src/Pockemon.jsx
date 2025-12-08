import { useEffect, useState } from "react"
import "./index.css"
import PockemonCards from "./PockemonCards";
export const Pockemon = () => {
   const [pockemon, setPockemon] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

   const fetchPockemon = async () => {
      try {
         const res = await fetch(API)
         const data = await res.json();
         // console.log(data);
         const detailedPockemon = data.results.map(async (currentpockemon) => {
            //  console.log(currentpockemon.url);

            const res = await fetch(currentpockemon.url);  // call all  api which is in the parent api in only one fetch
            const data = await res.json();
            return data;





         });
         const detailedResponse = await Promise.all(detailedPockemon)

         console.log(detailedResponse);
         setPockemon(detailedResponse);
         setLoading(false);


      } catch (error) {
         console.log(error);
         setLoading(false);
         setError(error)



      }

   }
   useEffect(() => {
      fetchPockemon();


   }, []);
   if (loading) {
      return (
         <div>
            <h1>Loading....</h1>
         </div>
      )
   }
   if (error) {
      return (
         <div>
            <h1>{error.message}</h1>
         </div>
      )
   }
   return (
      <>
         <section className="container">
            <header>
               <h1>hello pockemon</h1>

            </header>
            <div>
               <ul className="cards">
                  {
                     pockemon.map((curPockemon) => {
                        return (
                           <PockemonCards key={curPockemon.id} pockemonData={curPockemon} />
                        )
                     })
                  }

               </ul>
            </div>
         </section>

      </>
   )
}
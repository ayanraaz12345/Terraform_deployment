import React, { useEffect, useState } from 'react'


const Promises = () => {
   const [apiData, setApiData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setErorr] = useState("");
   const API = 'https://pokeapi.co/api/v2/pokemon/pikachu';

   function fetchApi() {
      fetch(API)
         .then((res) => res.json())
         .then((data) => {
            setApiData(data);
            setLoading(false)

         })
         .catch((error) => {
            console.log(error);
            setErorr(error);
            setLoading(false);

         });


   };
   useEffect(() => {
      fetchApi();
      //  setLoading(false);
   }, []);
   console.log(apiData);
   if (loading)
      return (
         <div>
            <h1>Loading....</h1>
         </div>
      );
   if (error)
      return (
         <div>
            <h1>Error:{error.message}</h1>
         </div>)
   return (
      <div>
         <figure>
            <img src={apiData.sprites.other.dream_world.front_default} />
         </figure>
         <ul>data:
            <h1> {apiData.name}
            </h1>


         </ul>
      </div>
   )


}


export default Promises

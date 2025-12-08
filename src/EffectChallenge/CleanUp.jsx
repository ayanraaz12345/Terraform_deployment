import React, { useEffect, useState } from 'react'


const CleanUp = () => {
   const [count, setCount] = useState(0);
   useEffect(() => {
      const timer = setInterval(() => { //useeffect only render one time when its get updtated thanks
         setCount((prev) => prev + 1)

      }, 1000)
      return () => clearInterval(timer) //clean up function  

   }, [])

   return (
      <div>
         <p>
            count <span>{count}</span>
         </p>


      </div>
   )
}

export default CleanUp

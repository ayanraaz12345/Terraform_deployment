import React from 'react'

const Props = () => {
   return (
      <div>
         <CardComp
            name='raj'
            age={30}
            greeting={
               <div>
                  <strong>Hello raj keep the records </strong>
               </div>
            }
         />
         <p>Hobbies Gamming Cookies</p>
         <button>Contact</button>

         <CardComp
            name='satyam'
            age={33}
            greeting={
               <div>
                  <strong>Hello Satyam keep the records </strong>
               </div>
            }
         />

      </div>
   )
}

export default Props

function CardComp(prps) {
   return (
      <div>
         <h2>Name:{prps.name}</h2>
         <p>
            Age: {prps.age}
         </p>
         <p>{prps.greeting}</p>

      </div>
   )
}

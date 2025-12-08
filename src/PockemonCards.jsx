import React from 'react'

const PockemonCards = ({ pockemonData }) => {
   return (
      <li className='pokemon-card'>
         <figure>

            <img src={pockemonData.sprites.other.dream_world.front_default} alt={pockemonData.name}
               className='pokemon-image '
            />
         </figure>
         <h1 className='pokemon-name'>{pockemonData.name}</h1>
         <div className='pokemon-info pokemon-highlight'>
            <p className=''>
               {pockemonData.types.map((currType) => currType.type.name).join(",")}
            </p>

         </div>
         <div className='grid-three-cols'>
            <p className='pokemon-info'>
               <span>Height:</span>{pockemonData.height}
            </p>
            <p className='pokemon-info'>
               <span>Height:</span>{pockemonData.weight}
            </p>
            <p className='pokemon-info'>
               <span>Speed:</span>{pockemonData.stats[5].base_stat}
            </p>

         </div>
         <div className='grid-three-cols'>
            <div className='pokemon-info'>
               <p>{pockemonData.base_experience}</p>
               <span>Experience:</span>
            </div>
            <div className='pokemon-info'>
               <p>{pockemonData.stats[1].base_stat}</p>
               <span>Attack:</span>
            </div>
            <div className='pokemon-info'>
               <p>{pockemonData.abilities.
                  map((abilityInfo) => abilityInfo.ability.name).slice(0, 1).join(",")}
               </p>
               <span>abilities:</span>
            </div>

         </div>
      </li>

   )


}

export default PockemonCards

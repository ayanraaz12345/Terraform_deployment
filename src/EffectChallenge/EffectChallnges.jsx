// import React, { useEffect, useState, } from 'react'

// const EffectChallnges = () => {
//    const [count, setCount] = useState(0)
//    const [name, setName] = useState("raj")
//    const changed = () => {
//       setCount(() => count + 2);

//    }
//    useEffect(() => {

//       document.title = `count:${count}`;
//    }, [count])
//    useEffect(() => {
//       console.log(name);
//       console.log(count);



//    }, [name, count])

//    return (
//       <div >
//          <h1>effect challenges</h1>
//          <p> Count:<span>{count}</span></p>
//          <button onClick={changed}> Increment</button>
//          <p>
//             Name :<span>{name}</span>
//          </p>
//          <p>
//             <input type="text" value={name}
//                onChange={(e) => setName(e.target.value)} />
//          </p>
//       </div>
//    )
// }

// export default EffectChallnges

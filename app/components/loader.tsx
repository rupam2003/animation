import { useAnimate } from 'motion/react';
import React, { useEffect, useState } from 'react'

const Loader = () => {
  const [scope,animate] = useAnimate()
  useEffect(() => {
    function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function count() {
      for(let i=0;i<100;i++){
        setCount((count)=>{
          return count+1
        })
      await sleep(10);
      } 
    }
    count()
    animate(scope.current, {y: [0,-1000]}, {duration: 1, delay: 2})
   
  }, [])
  

  const [count, setCount] = useState(0)
  return (
    <div ref={scope} className='z-200 bg-white overflow-hidden  h-screen'>
      <div className='flex justify-center items-center text-2xl w-screen h-screen font-medium'>
      <h1>LOADING {"["}{count}{"]"}</h1>
    </div>
    </div>
    
  )
}

export default Loader
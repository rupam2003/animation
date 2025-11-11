"use client"
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { ReactLenis, useLenis } from 'lenis/react'
import { motion, useAnimate, useMotionValueEvent, useScroll } from 'motion/react'
import Snap from 'lenis/snap'
import Loader from './components/loader'
import { a } from 'motion/react-client'

const Page = () => {
  
  const imageArray = [
    "https://assets.codepen.io/7558/flame-glow-blur-001.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-002.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-003.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-004.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-005.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-006.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-007.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-008.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-009.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-010.jpg",

  ]
  const wordArray = [
  "Intuition",
"Authenticity",
"Presence",
"Listening",
"Curiosity",
"Patience",
"Compassion",
"Gratitude",
"Resilience",
"Courage"
  ]
  const lenis = useLenis((lenis) => {
    // called every scroll
    
  })
  const [current, setCurrent] = useState(1)
  const [prev, setPrev] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [scope, animate]= useAnimate()
  const {scrollY,scrollYProgress} = useScroll()
  const [scrollDirection, setScrollDirection] = useState("down")

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPrev(current)
    if(current > Math.floor(latest * 10) + 1)
      setScrollDirection("up")
    else if(current < Math.floor(latest * 10) + 1)
      setScrollDirection("down")
    if(Math.floor(latest * 10) + 1 !== current)
      setCurrent(Math.floor(latest * 10) + 1)
    console.log("Page scroll: ",current ,prev, scrollDirection)
})
  
useEffect( () => {
  async function handleAnimate(){
        console.log("Page change: ",current ,prev, scrollDirection)

    try{
    if(current === prev) return
    if(current < 1 || current > imageArray.length) return
    if(scrollDirection === "down"){
      await animate(`#background-${prev}`, {clipPath: "inset(0 0 0 0)"}, {duration: 0})
      await animate(`#background-${current}`, {clipPath: "inset(100% 0 0 0)"}, {duration: 0}) 
      animate(`#background-${prev}`, {clipPath: "inset(0 0 100% 0)"}, {duration: 0.3, ease: "easeInOut"})
      animate(`#background-${current}`, {clipPath: "inset(0% 0 0 0)"}, {duration: 0.3, ease: "easeInOut"}) 
    lenis?.stop()
    setTimeout(() => {
      lenis?.start() 
    }, 500);
    }
    if(scrollDirection === "up"){
      await animate(`#background-${prev}`, {clipPath: "inset(0% 0 0 0)"}, {duration: 0, ease: "easeInOut"})
      await animate(`#background-${current}`, {clipPath: "inset(0 0 100% 0)"}, {duration: 0, ease: "easeInOut"})
      animate(`#background-${prev}`, {clipPath: "inset(100% 0 0 0)"}, {duration: 0.3, ease: "easeInOut"})
      animate(`#background-${current}`, {clipPath: "inset(0 0 0 0)"}, {duration: 0.3, ease: "easeInOut"})
      lenis?.stop()
    setTimeout(() => {
      lenis?.start() 
    }, 500);
    }

  }catch(err){
    console.log("Animation error: ", err)
  }
  }

  handleAnimate()
}, [current])

useEffect(() => {
   function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  async function load(){
    await sleep(3000)
    setIsLoading(false)     
  }
  load()
})


  return (
    <>
    <ReactLenis root />
    {isLoading &&<div className='overflow-hidden w-screen h-screen fixed top-0 left-0 z-50'>
      <Loader />
    </div>}
    <div 
    ref={scope} id='main' className='overflow-x-hidden'>
       <div className="background-container w-full h-[1000vh]" id="background-container">
        {
          imageArray.map((src, idx) => (
            <motion.div 
            style={{
              clipPath:idx ===0 ? "inset(0 0 0 0)": "inset(100% 0 0 0)" 
            }}
            id={`background-${idx + 1}`}
            key={idx} 
            className={`${current===idx? "":""} image-hidden w-full h-screen fixed top-0`}
            >
              <Image style={{ objectFit: 'cover' }} priority fill src={src} alt={`Background ${idx + 1}`} />
            </motion.div>
          ))
        }
       
      </div>
      <div className='px-5 flex justify-between items-center lg:text-xl text-base font-medium text-white/50 fixed top-0 w-full h-screen z-50'>
        <div className='flex flex-col'>
           {
          wordArray.map((word, idx) => (
            <div key={word} className='overflow-hidden'>
              <motion.button
            initial={{y:30,opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{delay:2+ idx * 0.05, duration:0.3, ease:"easeInOut"}
            }
            onClick={()=>{
              window.scrollTo(0,(window.innerHeight-10) * idx)
            }}
             className={`${current === idx+1 ? "text-white translate-x-2.5 ": ""} text-left px-4 tracking-tighter uppercase transition-all`} key={word}>
              {current === idx+1 && <span className='mr-5'>&#8226;</span>}
              <span className={`${current === idx+1 ? "": ""} transition-all`} >{word}</span>
              </motion.button>
            </div>
            
        ))}
        </div>
      
        <div className='flex flex-col'>
           {
          wordArray.map((word, idx) => (
            <div key={word} className='overflow-hidden'>
              <motion.button
            initial={{y:30,opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{delay: 2 + idx * 0.05, duration:0.3, ease:"easeInOut"}
            }
            onClick={()=>{
              window.scrollTo(0,(window.innerHeight-10) * idx)
            }}
             className={`${current === idx+1 ? "text-white -translate-x-2.5 ": ""} text-right px-4 tracking-tighter uppercase transition-all`} key={word}>
              <span className={`${current === idx+1 ? "": ""} transition-all`} >{word}</span>
              {current === idx+1 && <span className='ml-5'>&#8226;</span>}
              </motion.button>
            </div>
        ))}
        </div>
        
        
      </div>
      <div className='z-10 px-5 flex flex-col text-center gap-28 justify-center items-center lg:text-9xl md:text-7xl text-5xl font-semibold text-white/70 fixed top-0 w-full h-screen'>
        <h1 className='tracking-tighter max-w-[80vw] lg:leading-25'>THE CREATIVE PROCESS</h1>
        <h1 className='tracking-tighter max-w-[80vw] lg:leading-25'>BEYOND THINKING</h1>
      </div>

      {/* center words */}
      <div className='z-10 px-5 flex flex-col text-center gap-28 justify-center items-center font-medium text-white/90 fixed top-0 w-full h-screen'>
       
        <div className='overflow-hidden'>
          {
            wordArray.map((word, idx) => (
              idx + 1 === current &&
              <motion.h1
              initial={scrollDirection==="down"? {y:30} : {y:-30}}
              animate={{y:0}} 
              key={idx}
              className='tracking-tighter uppercase lg:text-3xl text-2xl'>{word}</motion.h1>
            ))
          }
          
        </div>
       
        
      </div>
    </div>
    </>
  )
}

export default Page
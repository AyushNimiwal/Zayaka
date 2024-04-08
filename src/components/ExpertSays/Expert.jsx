import React, { useEffect,useState } from 'react'
import quote from '../../Images/quote.png'
import './Expert.css'
import gsap from "gsap";
import chef1 from '../../Images/R.jpg'
import chef2 from '../../Images/p.jpeg'
import chef3 from '../../Images/chef3.jpg'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const Expert = () => {
    const [images, setImages] = useState([
        {
            href: chef1,
            quote: 'Becoming a cook is my dream since i was little, and here i have found a way to make it happen.',
            by: 'Brian Veirmont',
        },
        {
            href: chef2,
            quote: "It's difficult to think anything but pleasant thoughts while eating a homegrown tomato.",
            by: 'Lewis Grizzard',
        },
        {
            href: chef3,
            quote: 'People who love to eat are always the best people.',
            by: 'Julia Child',
        }
    ]);
    const [idx, setIdx] = useState(0);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setIdx((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        },3000)
        return ()=>clearInterval(interval)
    
    },[setIdx])
    useEffect(()=>{
        gsap.fromTo(".ht",{scaleX:0.8,translateY:'40%'},{scaleX:1,translateY:'0', ease:"power1.inOut", scrollTrigger:{
          trigger:".ht",
          start:"top bottom",
          end:"top bottom +20px",
          scrub:1,
        }});
    },[]);
  return (
    <div className=' w-[100vw] md:h-[80vh] h-[115vh] flex justify-center items-center relative'>
        <div className=' w-4/5 md:h-5/6 h-full rounded-3xl py-4 border-2 border-orange-300 overflow-hidden'>
            <h1 className='md:text-[6rem] text-[2.8rem] md-p-3 font-medium absolute h-text md:-top-7 -top-5 left-0 select-none md:left-4 ht'>What They Say</h1>
            <h1 className='md:text-4xl text-xl text-end p-2 font-medium t mt-5'>Our Expert Chefs</h1>
            <div className='w-full h-4/5 flex flex-col md:flex-row justify-around p-2 overflow-hidden'>
                <div className='md:w-1/2 md:h-full h-1/2 w-full relative'>
                    {
                        images.map((image, index) => (
                            <div key={index} className={`w-full h-full rounded-xl object-cover absolute transition-transform duration-500 ${index===idx?' translate-x-0':'-translate-x-full'}`}>
                                <img src={image.href} alt="" className='w-full h-full rounded-xl'/>
                            </div>
                        ))
                    }
                </div>
                <div className='md:w-1/2 w-full md:pt-5 px-2 md:px-10 h-full relative'>
                    {
                        images.map((image, index) => (
                            <div key={index} className='w-full absolute'>
                                <img src={quote} className={`w-14 h-14 transition-transform duration-700 ${index===idx?' translate-y-0 opacity-100':' -translate-y-full opacity-0'}`}/>
                                <h3 className={`px-2 text-xl transition-transform duration-1000 ${index===idx?' translate-x-0 opacity-100':' translate-x-full opacity-0'}`}>{image.quote}</h3>
                                <h5 className={`pt-8 px-2 font-medium transition-transform duration-1000 ${index===idx?' translate-y-0 opacity-100':' translate-y-full opacity-0'}`}>{image.by}</h5>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

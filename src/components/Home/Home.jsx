import React, { useEffect, useState } from 'react'
import Carousel from '../Carousel/Carousel'
import { Expert } from '../ExpertSays/Expert';
import restaurant from '../../Images/restaurant.png'
import ig from '../../Images/ig.png'
import wp from '../../Images/wp.png'
import tw from '../../Images/tw.png'
import './Home.css'
import {motion} from 'framer-motion'
import Spline from '@splinetool/react-spline';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from '../Card/Card';
import service from '../appwrite/conf';
import { Link } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);
const home = () => {
  const [mouse, setmouse] = useState({x:0,y:0});
  const [variant, setvariant] = useState('default');
  const [img,setImg]=useState('');
  const [data, setData] = React.useState([]);
  const [allData,setAllData]=useState([]);
  const [category,setCategory]=useState([]);
  useEffect(() => {
    service.getCategory().then((result) => {
      for(let i=0;i<5;i++){
        const random=Math.floor(Math.random() * (result.length+ 1));
        setCategory((prev)=>[...prev,result[random]]);
      }
    });
    service.getPosts().then((result) => {
      setAllData(result);
      setData(result.reverse().slice(0,4));
    });
  
  }, []);
  useEffect(()=>{
    const tl=gsap.timeline();
    tl
    .from(".t2",{
      delay:1,
      x:-1100,
      opacity:0,
    },"a4")
    .to(".t2",{
      delay:1,
      x:0,
      opacity:1,
    },"a4");
  },[])
  useEffect(()=>{
      const mouseMove=(e)=>{
          setmouse({x:e.clientX,y:e.clientY});
      }
      window.addEventListener("mousemove",mouseMove);
      return ()=>{
          window.removeEventListener("mousemove",mouseMove);
      }
  },[]);
  useEffect(()=>{
    gsap.fromTo(".trends",{scale:0.8},{scale:1, duration:1, ease:"power1.inOut", scrollTrigger:{
      trigger:".trends",
      start:"top bottom",
      end:"top bottom-20px",
      scrub:2,
    }});
    gsap.fromTo(".rpod",{scale:0.8},{scale:1, duration:1, ease:"power1.inOut", scrollTrigger:{
      trigger:".rpod",
      start:"top bottom",
      end:"top bottom-20px",
      scrub:2,
    }});
    gsap.fromTo(".daily",{translateY:'80%',scaleX:0.5},{scaleX:1,translateY:'0', duration:1.5, ease:"power2.inOut", scrollTrigger:{
      trigger:".rpod",
      start:"top bottom-20px",
      end:"top bottom+20px",
      scrub:2,
    }});
    gsap.fromTo(".meal",{translateY:'-80%',scaleX:0.5},{scaleX:1,translateY:'0', duration:1.5, ease:"power2.inOut", scrollTrigger:{
      trigger:".rpod",
      start:"top bottom-20px",
      end:"top bottom+20px",
      scrub:2,
    }});
    gsap.fromTo(".dt1",{translateY:'-80%',opacity:0,scaleX:0.5},{scaleX:1,opacity:1,translateY:'0', duration:1.5, ease:"power2.inOut", scrollTrigger:{
      trigger:".d1",
      start:"top center",
      end:"top bottom",
      scrub:2,
    }});
    gsap.fromTo(".dt2",{translateY:'80%',opacity:0,scaleX:0.5},{scaleX:1,translateY:'0',opacity:1, duration:1.5, ease:"power2.inOut", scrollTrigger:{
      trigger:".d1",
      start:"top center",
      end:"top bottom",
      scrub:2,
    }});
    gsap.fromTo(".d2t1",{translateY:'-80%',opacity:0,scaleX:0.5},{scaleX:1,translateY:'0',opacity:1, duration:1.5, ease:"power2.inOut", scrollTrigger:{
      trigger:".d2",
      start:"top center",
      end:"top bottom",
      scrub:2,
    }});
    gsap.fromTo(".d2t2",{translateY:'80%',opacity:0,scaleX:0.5},{scaleX:1,translateY:'0',opacity:1, duration:1.5, ease:"power2.inOut", scrollTrigger:{
      trigger:".d2",
      start:"top center",
      end:"top bottom",
      scrub:2,
    }});
  },[])
  const variants  = {
      default:{
          x:mouse.x,
          y:mouse.y
      },
      text:{
        x:mouse.x,
        y:mouse.y,
        width:200,
        height:200,
        borderRadius:'50%',
      },
      boximage:{
          x:mouse.x,
          y:mouse.y,
          width:300,
          height:250,
          borderRadius:'10%',
          backgroundImage:`url(${img})`,
      }
    };
  const boxEnter=(id)=>(
    service.getImage(id).then((result) => {
      setvariant('boximage'),
      setImg(result.href)
    })      
  )
  const boxLeave=()=>setvariant('default');
  const textEnter=()=>setvariant('text');
  const textLeave=()=>setvariant('default');
  return (
    <div className='w-[100vw] h-full'>
      <div className='w-[100vw] h-[100vh] loader'>
        <div className='w-full h-full relative'>
          <div className='w-[100vw] h-[100vh] absolute'>
            
            <div className='w-full h-full relative'>
              <div className=' absolute spline'>
                <Spline scene="https://prod.spline.design/wnIPOF26uDtnJUBC/scene.splinecode" />
              </div>  
              <span className=' p-2 overflow-hidden absolute  pl-5 t2'>Let<span className=' text-orange-400'>'</span>s <br></br><span className=' text-orange-400 t2'>Share</span> Your <br></br>Recipes</span>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className='cursor md:block hidden w-5 h-5 rounded-full top-0 left-0 fixed bg-orange-400 z-50 transition-all ease-linear duration-75'
        variants={variants}
        animate={variant}>  
      </motion.div>
      <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className=' trends select-none font-medium h-fit text-center htext overflow-hidden'>IN TRENDS</h1>
      
      <Carousel/>
      <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className=' rpod w-full select-none p-2 text-center font-medium htext overflow-hidden'>RECIPES OF THE DAY</h1>
      <div className='w-[100vw] h-[80vh] relative overflow-hidden mb-14'>
        <h1 className=' w-fit text-[8rem] font-medium absolute p-2 h-text -rotate-90 daily'>DAILY</h1>
        <h1 className=' w-fit text-[8rem] font-medium absolute p-2 h-text rotate-90 meal'>MEAL</h1>
        <div className='w-full h-full flex flex-col items-center justify-center absolute'>
          {
            data.map((item,index)=>(
              <div key={index} onMouseEnter={()=>boxEnter(item.featuredImages[0])} onMouseLeave={boxLeave} className='box w-full md:w-3/4 h-24  transition-all duration-500 hover:border-t-2 hover:border-b-2 hover:border-orange-400 flex items-center justify-between px-4'>
                  <div className=' w-fit h-18 text-center relative overflow-hidden'>
                      <div className=' w-full h-1/2 bg-white absolute top-0 clip-t overflow-hidden'>
                          <h1 className='text-2xl font-bold absolute -bottom-4 h-text select-none'>{item.recipename}</h1>
                      </div>
                      <h1 className='text-2xl font-bold text-orange-300 select-none'>{item.recipename}</h1>
                      <div className=' w-full h-1/2 bg-white absolute bottom-0 clip-b overflow-hidden'>
                          <h1 className='text-2xl font-bold absolute -top-4 h-text select-none'>{item.recipename}</h1>
                      </div>
                  </div>
                  <div className='w-36 h-18 text-2xl py-1 px-1 select-none cursor-pointer text-center border-r-8 border-t-8 shadow-xl border-2 border-orange-400 rounded-full text-orange-400 btn'>
                    <Link to={`/recipe/${item.$id}`}>Let's Cook</Link>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
      <Expert/>
      {
        category&&category.map((item,index)=>(
        <div key={index} className='w-[100vw] h-[70vh] flex flex-col items-center relative d1 overflow-hidden'>
          <div className='w-[95%] h-fit md:py-2 md:mt-28 overflow-x-scroll contain'>
            <div className='w-fit h-fit flex items-center c-item'>
              {
                allData.filter((post) => post.category.includes(item)).map((post, index) => (
                  <Card key={index} post={post}/>
                ))
              }
            </div>
          </div>
          <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className='md:text-[5rem] text-[3rem] p-2 h-text2 h-fit w-fit absolute md:top-1 top-11  select-none left-0 md:left-10 dt1'>{item[0].toUpperCase()+item.substring(1)}</h1>
        </div>
        ))
      }
      <div className='w-full h-fit bg-orange-100 flex flex-col items-center'>
        <div className='w-full h-36 m-2 flex justify-around items-center'>
          <div className='flex flex-col'>
            <div className=' flex gap-4'>
              <img src={restaurant} className='w-14 h-14'/>
              <h1 className='text-4xl p-2 font-medium'>Zayaka</h1>
            </div>
            <h2>Chandigarh,India</h2>
            <h2>(555)546-6789</h2>
            <h2>hello@zayaka.io</h2>
          </div>
          <div className=' w-fit h-fit p-2 flex flex-col'>
            <h1 className=' cursor-pointer transition-transform duration-200 hover:scale-105 '>About</h1>
            <h1 className=' cursor-pointer transition-transform duration-200 hover:scale-105 '>Categories</h1>
            <h1 className=' cursor-pointer transition-transform duration-200 hover:scale-105 '>Privacy Policy</h1>
          </div>
        </div>
        <h2>2024 Copyright © zayaka.io, All Rights Reserved</h2>
        <div className='w-56 h-16 p-2 flex gap-8 m-4'>
              <img className='w-10 h-10 cursor-pointer transition-transform duration-200 hover:scale-105 ' src={ig}/>
              <img className='w-10 h-10 cursor-pointer transition-transform duration-200 hover:scale-105 ' src={wp}/>
              <img className='w-10 h-10 cursor-pointer transition-transform duration-200 hover:scale-105 ' src={tw}/>
        </div>
      </div>
    </div>
  )
}

export default home
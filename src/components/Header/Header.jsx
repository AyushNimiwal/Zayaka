import React,{useState,useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom';
import gsap from "gsap";
import restaurant from '../../Images/restaurant.png'
import zoom from '../../Images/zoom.png'
import menu from '../../Images/menu.png'
import authService  from '../appwrite/Auth';
function Header() {
  const [menuBtn,setMenuBtn]=useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userName,setUserName]=useState('');
  const [windowSize,setWindowSize]=useState(window.innerWidth);
  useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          setUserName(userData.name);
          setIsUser(true);
        }
        else{
          setIsUser(false);
        }
      })
      .finally(()=>{
      });
  },[window.location.href])
  useEffect(()=>{
    const t=gsap.timeline();
    t.from(".burger-menu",{
      transform:"translateX(100%)",
      duration:1,
      ease:"power2.inOut"
    })
    .to(".burger-menu",{
      transform:"translateX(0)",
      duration:1,
      ease:"power2.inOut"
    });
  },[menuBtn===true])
  return (
    <>
    <div className='w-full flex justify-between  text-gray-600 items-center fixed header z-40'>
            <div className='w-fit h-fit flex gap-3'>
              <img className='w-10 h-10 md:mx-8  mx-2 my-3 logo hidden' src={restaurant}/>
              <h1 className='text-center text-4xl font-bold md:px-8 mx-2 py-2 htext ltext'>Zayaka</h1>
            </div>
            <div className='bh w-1/3 justify-evenly sm:gap-3 items-center h-fit p-2 m-3 text-xl hbg'>
              <span className=' cursor-pointer hover:text-orange-400 transition-all hover:scale-105'><NavLink to={'/'}>All</NavLink></span>
              <span className=' cursor-pointer hover:text-orange-400 transition-all hover:scale-105'><NavLink to={'/categories'}>Categories</NavLink></span>
              <span className=' cursor-pointer hover:text-orange-400 transition-all hover:scale-105'><NavLink to={'/about'}>About</NavLink></span>
              <span className=' cursor-pointer hover:text-orange-400 transition-all hover:scale-105'><Link to={"/search"}><img className='w-8 h-8' src={zoom}/></Link></span>
            </div>
            {!isUser?<div className='bh w-fit h-fit text-xl justify-evenly items-center p-2 m-3 pb-3'>
              <span className='p-2 w-fit cursor-pointer hover:text-orange-400 transition-all hover:scale-105 hbg'><Link to={"/signin"}>Sign In</Link></span>
              <span className='mx-2 w-fit p-2 rounded-full transition-all cursor-pointer bg-orange-500 text-white hover:scale-110'><Link to={"/signup"}>Sign Up</Link></span>
            </div>:
            <div className='bh w-fit h-fit text-xl justify-evenly items-center p-2 m-3 pb-3'>
              <div className=' w-12 h-12 text-center overflow-hidden rounded-full text-4xl font-bold bg-gray-100 cursor-pointer hover:text-white border-2 border-orange-400 hover:bg-orange-400 text-orange-400 transition-all hover:scale-105 hbg'><Link to={"/profile"}>{userName[0]}</Link></div>
            </div>}
            <div onClick={()=>(setMenuBtn(prev=>(!prev)))} className='hb cursor-pointer transition-all hover:scale-105'><img className='w-9 h-9 m-3' src={menu}/></div>
    </div>
    <div className={` h-screen w-2/3 fixed top-0 z-40 right-0 bg-orange-400 text-white burger-menu ${windowSize<768&&menuBtn?'block':'hidden'}`}>
        <div onClick={()=>(setMenuBtn(prev=>(!prev)))} className=' text-white w-full text-right'>
        <button onClick={()=>(close((prev)=>!prev))} className='ml-auto'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 m-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/>
                        </svg>
                    </button>
        </div>
        <div className=' w-full text-xl text-center  p-3 hover:text-orange-400 hover:bg-gray-100 '>All</div>
        <div className=' w-full text-xl text-center  p-3 hover:text-orange-400 hover:bg-gray-100 '>Categories</div>
        <div className=' w-full text-xl text-center  p-3 hover:text-orange-400 hover:bg-gray-100 '>About</div>
        <div className=' w-full text-xl text-center  p-3 hover:text-orange-400 hover:bg-gray-100'><Link to={"/search"}>Search</Link></div>
        <div className=' w-full text-xl text-center  p-3 hover:text-orange-400 hover:bg-gray-100 '><Link to={"/signin"}>Sign In</Link></div>
        <div className=' w-full text-xl text-center  p-3 hover:text-orange-400 hover:bg-gray-100 '><Link to={"/signup"}>Sign Up</Link></div>
        <div className=' w-full text-xl text-center  p-3 hover:text-orange-400 hover:bg-gray-100 '><Link to={"/profile"}>{userName}</Link></div>
    </div>
    </>
  )
}

export default Header
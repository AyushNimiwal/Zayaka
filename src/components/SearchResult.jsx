import React, { useEffect ,useState} from 'react'
import star from '../Images/star.png'
import clock from '../Images/clock.png'
import { useNavigate,Link } from 'react-router-dom'
import gsap from "gsap";
import service from './appwrite/conf';
import authService from './appwrite/Auth';
export const SearchResult = () => {
  const [querytext,setQuerytext]=useState('');
  const [data,setData]=useState([]);
  const navigate = useNavigate();
  const close=()=>{
    navigate('/', { replace: true });
  }
  const searchQuery=()=>{
    if(querytext==''){
      return;
    }
    service.getPosts().then((res)=>{
      const temp=[];
      res.forEach((post)=>{
        if(post.recipename.toLowerCase().includes(querytext.toLowerCase())){
          service.getImage(post.featuredImages[0]).then((image)=>{
            post.featuredImages[0]=image.href;
            authService.getUsername(post.userid).then((user)=>{
              console.log(user);
              post.featuredImages.push(user.name);
            });
            temp.push(post);
            
          });
        }
      });
      setData(temp);
    });
  }
  useEffect(()=>{
    const t=gsap.timeline();
    t.from(".sdiv",{
      y:"-100%",
    },0.5)
    .to(".sdiv",{
      y:0,
      duration:1,
    },0.5);
  },[window.location.pathname=='/search'])
  return (
    <>
        <div className='w-screen h-full min-h-screen bg-white z-40 fixed sdiv'>
          <div className='w-full flex px-10 justify-between py-4'>
            <div className='w-1/2 flex'>
              <input onPointerEnter={searchQuery} className='w-3/4 h-12 bg-slate-100 ring-1 ring-gray-300 focus:ring-orange-400 ring-inset outline-none px-8 text-xl rounded-l-lg' value={querytext} onChange={(e)=>(setQuerytext(e.target.value))}/>
              <div onClick={searchQuery} className='text-center w-fit p-2 rounded-r-lg bg-orange-400 cursor-pointer text-xl text-white hover:scale-x-110 transition-transform'>Search</div>
            </div>
            <button onClick={close} className="ml-auto text-orange-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h1 className='text-4xl text-orange-400 px-10 py-4'>Recipes:</h1>
          <div className='w-screen h-fit flex flex-col items-center pt-10'>
            {data.map((post,index) =>(
                <div key={index} className='w-3/4 h-72 border-double border-t-2 border-b-2 border-orange-400 m-4 flex justify-around items-center'>
                  <div className='w-1/3 h-56'>
                    <img className='w-full h-full object-cover rounded-lg border-2 border-orange-400' src={post.featuredImages[0]}/>
                  </div>
                  <div className=' w-3/5 h-64 text-orange-400'>
                    <div className=' w-full h-fit p-2 flex justify-between'>
                      <div className='w-2/3 text-xl'>{post.recipename}
                      </div>
                      <div className='w-fit h-fit flex justify-around gap-3'>
                        <div className={`text-white w-fit h-full text-xl flex justify-center pl-2 bg-orange-400/40 rounded-full border border-white/40 backdrop-blur-md`}>
                          <img className='w-5 h-5 my-1' src={clock}/>
                          <p className='w-fit h-fit px-2'>{post.time}min</p>
                        </div>
                      </div>
                    <div>
                      </div>
                    </div>
                    <div className='w-full h-3/5 flex flex-col justify-between'>
                      <p className='text-lg'>{post.description}</p>
                      <div className='w-fit h-fit'>
                        <p className='text-lg text-orange-400'>By: {post.featuredImages[1]}</p>
                    </div>
                  </div>
                  <div className='w-fit h-fit text-xl mt-4 py-1 px-2 select-none cursor-pointer text-center shadow-md border-2 border-orange-400 rounded-full text-orange-400 transition-all duration-300 hover:text-white hover:bg-orange-400'><Link to={`/recipe/${post.$id}`}>Let's Cook</Link></div>
                  </div>
                </div>
            ))}
          </div>
        </div>
    </>
  )
}

import React from 'react'
import star from '../../Images/star.png'
import clock from '../../Images/clock.png'
import { Link } from 'react-router-dom'
import './Card.css'
import service from '../appwrite/conf'
function Card({post}) {
    const [image, setImage] = React.useState('');
    React.useEffect(() => {
      service.getImage(post.featuredImages[0]).then((result) => {
        setImage(result.href);
      });
    },[]);
  return (
    <div className='card  rounded-2xl my-2 relative overflow-hidden md:w-96 md:h-60 w-72 h-60 md:mr-6 mr-2'>
                    <div className='w-full h-full object-cover card-img transition-transform duration-500 absolute overflow-hidden'>
                        <img className=' w-96 h-60' src={image}/>
                    </div>
                    <div className='card-c w-full h-full bg-gradient-to-t from-zinc-800/30 to-transparent absolute'>
                        <div className='w-full h-full flex flex-col justify-between'>
                            <div className='w-full h-14 flex justify-between py-2 px-2 overflow-hidden'>
                                <div className='text-gray-400 w-fit h-full text-xl p-1 pl-2 flex justify-center bg-white/30 rounded-full border border-white/40 backdrop-blur-md'>
                                <img className='w-5 h-5 my-1' src={clock}/>
                                <p className='w-fit h-fit px-2'>{post.time}min</p>
                                </div>
                            </div>
                            <div className='w-full h-fit p-3 overflow-hidden'>
                                <h1 className='text-white font-bold text-2xl'>{post.recipename}</h1>
                                <p className='text-white text-sm'>{post.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-b w-full h-full translate-y-full transition-transform duration-500 bg-orange-300/15 object-cover absolute flex justify-center items-center'>
                        <div className='w-1/2 h-fit py-4 px-2 text-xl cursor-pointer text-white text-center bg-orange-400 rounded-full shadow-xl card-b'><Link to={`/recipe/${post.$id}`}>Let's Cook</Link></div>
                    </div>
    </div> 
  )
}

export default Card
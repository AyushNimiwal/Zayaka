import React, { useEffect, useState } from 'react'
import che from '../../Images/chef.png'
import ingredient from '../../Images/ingredients.png'
import inst from '../../Images/inst.png'
import star from '../../Images/star.png'
import estar from '../../Images/estar.png'
import ig from '../../Images/ig.png'
import tw from '../../Images/tw.png'
import wp from '../../Images/wp.png'
import './RecipeDetail.css'
import { useParams } from 'react-router-dom'
import service from '../appwrite/conf'
import authService from '../appwrite/Auth'
function RecipeDetail() {
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);
  const [chef, setChef] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    service.getPost(id).then((res) => {
      setData(res);
      service.getImage(res.featuredImages[0]).then((img) => {
        setImage(img.href);
      });
      authService.getUsername(res.userid).then((user) => {
        setChef(user.name);
      });
        setLoading(false);
    })
  }, [])
  const shareLinkOnInstagram = (e) => {
    navigator.clipboard.writeText(window.location.href);
    window.open('https://www.instagram.com/');
  }
  const shareLinkOnTwitter = (e) => {
    navigator.clipboard.writeText(window.location.href);
    window.open('https://twitter.com/');
  }
    const shareLinkOnWhatsApp = (e) => {
        navigator.clipboard.writeText(window.location.href);
        window.open('https://web.whatsapp.com/');
    }
  return (
    !loading?<div className='w-screen h-fit p-2 sm:p-8'>
        <h1 className='m-text h-text sm:mb-3'>{data.recipename}</h1>
        <h3 className='text-xl text-orange-400'>description</h3>
        <div className='w-full h-fit flex m-dis justify-around sm:px-8 '>
            <p className='w-full sm:w-2/3 text-lg h-full pt-3'>{data.description}</p>
            <div className='w-fit h-fit flex gap-5 justify-center items-center'>
                <div className='w-14 h-14  flex justify-center items-center rounded-full border-2 border-orange-400/60 overflow-hidden'>
                    <img className='w-14 h-14 rounded-full' src={che}/>
                </div>
                <div>
                    <h1>By: {chef}</h1>
                </div>
            </div>
        </div>
        <div className='w-full h-full flex m-dis gap-6 justify-between'>
            <div className='w-full h-full'>
            <div className='w-full sm:w-3/4 h-56 sm:h-96 mt-5 border-2 border-orange-400 rounded-xl object-cover overflow-hidden'>
                <img className='w-full h-full' src={image}/>
            </div>
                <h1 className='text-[2rem] h-text'>Instructions:</h1>
                {
                    data&&data.instructions.map((ins)=>{
                        return(
                            <div className='w-full flex justify-start gap-3 items-center m-3'><img className="w-8 h-8" src={inst}/><h5>{ins}</h5></div>
                        )
                    })
                }  
            </div>
            <div className=' w-full sm:w-2/5 h-full'>
                <h1 className='text-[2rem] h-text'>Ingredients:</h1>
                {
                    data&&data.ingredients.map((ing)=>{
                        return(
                            <div className='w-full flex justify-start gap-3 items-center'><img className="w-8 h-8" src={ingredient}/><h5>{ing}</h5></div>
                        )
                    })
                }
                <div className='w-full h-fit flex sm:flex-row flex-col sm:items-center justify-around'>
                    
                    <div className=' w-[250px] h-[230px] relative overflow-hidden grid place-items-center'>
                        <div className='select-none w-20 h-20 rounded-full bg-orange-500/40 backdrop-blur-sm grid place-items-center font-medium text-2xl relative z-10 text-white share'>Share</div>
                        <div className=' absolute inset-0 grid place-items-center wheel '>
                            <div onClick={shareLinkOnInstagram} className=' w-14 h-14 rounded-full cursor-pointer absolute top-[50px] left-[60px] grid place-items-center spoke sp1'><img className=" w-14 h-14" src={ig}/></div>
                            <div onClick={shareLinkOnWhatsApp} className=' w-14 h-14 rounded-full cursor-pointer absolute top-[140px] left-[100px] grid place-items-center spoke sp2'><img className=" w-14 h-14" src={wp}/></div>
                            <div onClick={shareLinkOnTwitter} className=' w-14 h-14 rounded-full cursor-pointer absolute top-[70px] left-[150px] grid place-items-center spoke sp3'><img className=" w-14 h-14" src={tw}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='sm:w-3/5 w-full h-fit'>
            
        </div>
    </div>:<div></div>
  )
}

export default RecipeDetail
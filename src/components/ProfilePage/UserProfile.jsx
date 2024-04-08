import React,{useState,useEffect} from 'react'
import chef from '../../Images/chef.png'
import edit from '../../Images/edit.png'
import { useNavigate } from 'react-router-dom';
import authService from "../appwrite/Auth";
import { Link } from 'react-router-dom';
import service from '../appwrite/conf';
function UserProfile() {
  const navigate = useNavigate();
  const [clicked, setClicked] = React.useState(false)
  const [cname,setCname]=React.useState("")
  const [ctitle,setCtitle]=React.useState("")
  const [userData,setUserData]=useState({});
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        setUserData(userData);
        setCname(userData.name);
      }
      else{
      }
    })
    .finally(()=>{
    });
},[])
  const handleLogout = () => {
    authService.logout();
    navigate("/", { replace: true });
  };
  useEffect(()=>{
    service.getPostsByUser(userData.$id).then((res)=>{
      res.map((post)=>{
        service.getImage(post.featuredImages[0]).then((img)=>{
          post.featuredImages[1]=img.href;
        })
      })
      setPosts(res.reverse());
    })
  },[userData])
  const handleDelete=(id,imageid)=>{
    return ()=>{
      service.deleteImage(imageid).then((res)=>{
      })
      service.deletePost(id).then((res)=>{
        if(res){
          setPosts((prev)=>{
            return prev.filter((post)=>post.$id!=id)
          })
        }
      })
    }
  }
  return (
    <div className='w-screen h-full min-h-screen bg-white sm:p-10 justify-center'>
        <div className='w-full flex justify-between pr-14 '>
          <h1 className='text-[2rem] sm:text-[3rem] h-text'>Profile</h1>
          <div className='w-fit px-2 flex gap-4 mt-5'>
            <h1 className='text-2xl text-orange-400 cursor-pointer hover:scale-x-105 hover:bg-orange-400 hover:text-white pt-2 px-2 rounded-md transition-all'><Link to={`/add/${userData.$id}`}>Add new Recipe</Link></h1>
            <h1 onClick={handleLogout} className='text-2xl text-gray-400 cursor-pointer hover:scale-x-105 hover:bg-red-400 hover:text-white pt-2 px-2 rounded-md transition-all'>logout</h1>
          </div>
        </div>
        <div className='sm:w-3/4 w-full h-full mt-5'>
          <div className='w-full sm:w-3/4 h-fit flex mt-5 sm:gap-5 justify-center items-center'>
                <div className='sm:w-24 sm:h-24 w-14 h-14  flex justify-center items-center rounded-full border-2 border-orange-400/60 overflow-hidden'>
                    <img className='sm:w-24 sm:h-24 w-14 h-14 rounded-full' src={chef}/>
                </div>
                <div className='w-3/4'>
                  <h1 className='text-2xl'>{cname}</h1>
                  <h1 className='text-xl text-gray-500'>{userData.email}</h1>
                </div>
          </div>
          <h1 className='text-[2rem] sm:text-[5rem] h-text mt-10'>Your Recipes</h1>
        </div>
          <div className='w-full h-full flex flex-wrap gap-2 justify-start px-10 py-4 items-center rounded-xl bg-gray-100 '>
            {
              posts.map((post)=>{
                return(
                  <div key={post.$id} className='w-64 h-76 flex flex-col items-center bg-white rounded-xl m-2 shadow-lg transition-all hover:scale-105'>
                    <div className='w-full h-52 bg-gray-200 rounded-t-xl overflow-hidden'>
                      <img className='w-full h-full object-cover' src={post.featuredImages[1]}/>
                    </div>
                    <h1 className='text-xl text-orange-400'>{post.recipename}</h1>
                    <div className='w-full p-2 flex justify-around items-center'>
                      <h1 className='text-lg text-white rounded-lg py-1 px-3 cursor-pointer bg-blue-400 hover:bg-blue-500 transition-colors '><Link to={`/edit/${post.$id}`}>Edit</Link></h1>
                      <h1 onClick={handleDelete(post.$id,post.featuredImages[0])} className='text-lg text-white rounded-lg py-1 px-3 cursor-pointer hover:bg-red-500 bg-red-400 transition-colors'>Delete</h1>
                    </div>
                  </div>
                )
              })
            } 
          </div>
    </div>
  )
}


export default UserProfile
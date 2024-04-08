import React,{useEffect,useState} from 'react'
import gsap from "gsap";
import { useNavigate } from 'react-router-dom';
import authService from "../appwrite/Auth";
function SignIn() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const tl = gsap.timeline({defaults:{ease:'power2.inOut'}})
    useEffect(()=>{
      tl.from('.signin-div',{y:"-80%"},"signup")
      .to('.signin-div',{y:0,duration:0.5},"signup")
    },[window.location.pathname==='/signin'])
    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login({email,password});
        setEmail('');
        setPassword('');
        navigate("/", { replace: true });
        window.location.reload();
    }
    const handleClose = () => {
        navigate("/", { replace: true });
    };
  return (
    <div className='w-screen h-screen bg-black/20 z-50 fixed'>
        <div className='w-full flex justify-center items-center h-full'>
            <div className='w-fit p-4  bg-white rounded-lg shadow-xl mx-2 signin-div z-50'>
            <div className='flex w-full h-fit mb-6'>
                <h2 className='text-3xl p-1 font-semibold text-center text-orange-400'>Sign In</h2>
                <button onClick={handleClose} className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/>
                </svg>
                </button>
            </div>
            <form className='mt-3'>
                <div className=' sm:w-96 mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-600'>Email</label>
                <input type='email' id='email' className='w-full p-4 border rounded-lg ' value={email} onChange={(e)=>(setEmail(e.target.value))}/>
                </div>
                <div className=' w-64 sm:w-96 mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-600'>Password</label>
                <input type='password' id='password' className='w-full p-4 border rounded-lg' value={password} onChange={(e)=>(setPassword(e.target.value))}/>
                </div>
                <div className='w-full flex justify-center'>
                <button onClick={handleSubmit} className='w-full p-4 text-white bg-orange-400 rounded-lg transition-colors hover:bg-orange-500'>Sign In</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default SignIn
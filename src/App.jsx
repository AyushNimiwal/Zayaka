import './App.css'
import {useState,useEffect} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from './components/Home/Home';
import {Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import authService  from './components/appwrite/Auth';
import {login,logout} from './store/authSlice';
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(window.location.pathname==='/'){
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}));
        }
        else{
          dispatch(logout());
        }
      })
      .finally(()=>{
        setLoading(false);
      });
    }
  },[])

  const images=['https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXMlMjBjYWtlfGVufDB8fDB8fHww','https://images.unsplash.com/photo-1505576633757-0ac1084af824?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1545576300-c7744d48aead?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1541766574321-8b81276f2102?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXMlMjBjYWtlfGVufDB8fDB8fHww'];
  return !loading?(
    <div className='w-screen h-full'>
      <Header/>
      <div className='w-screen h-full'>
        <Home/>
        <div className='absolute top-0'>
          <Outlet/>
        </div>
      </div>
    </div>
  ):null
}
export default App

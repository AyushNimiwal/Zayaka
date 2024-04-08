import React from 'react'
import star from '../../Images/star.png'
import clock from '../../Images/clock.png'
import './All.css'
function All() {
    const images=['https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXMlMjBjYWtlfGVufDB8fDB8fHww','https://images.unsplash.com/photo-1505576633757-0ac1084af824?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1545576300-c7744d48aead?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1541766574321-8b81276f2102?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXMlMjBjYWtlfGVufDB8fDB8fHww'];
  return (
    <div className='w-screen h-full'>
        <h1 className=' text-[8rem] ht px-4'>All Recpies</h1>
        <div className='w-[100vw] h-fit flex flex-col items-center relative d2 overflow-hidden'>
        <div className=' md:w-3/4 w-full px-2 h-24 md:mb-4 flex justify-end items-center'>
          <div className='w-36 h-18 text-2xl py-1 px-1 select-none cursor-pointer text-center border-r-8 border-t-8 shadow-md border-2 border-orange-400 rounded-full text-orange-400 transition-all duration-300 hover:text-white hover:bg-orange-400'>
            View All
          </div>
        </div>
        <div className='w-[95%] h-fit md:py-2 md:mt-5 overflow-x-scroll contain'>
          <div className='w-fit h-full flex items-center c-item'>
            {images.map((image, index) => (
                <div className='card  rounded-2xl my-2 relative overflow-hidden md:w-96 md:h-60 w-72 h-60 md:mr-6 mr-2'>
                    <div className='w-full h-full object-cover card-img transition-transform duration-500 absolute overflow-hidden'>
                        <img className=' w-96 h-60' src="https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXMlMjBjYWtlfGVufDB8fDB8fHww"/>
                    </div>
                    <div className='card-c w-full h-full bg-gradient-to-t from-zinc-800/30 to-transparent absolute'>
                        <div className='w-full h-full flex flex-col justify-between'>
                            <div className='w-full h-14 flex justify-between py-2 px-2 overflow-hidden'>
                                <div className='text-white w-fit h-full text-xl p-1 pl-2 flex justify-center bg-white/30 rounded-full border border-white/40 backdrop-blur-md'>
                                <img className='w-5 h-5 my-1' src={clock}/>
                                <p className='w-fit h-fit px-2'>25min</p>
                                </div>
                                <div className='text-white w-fit h-full text-xl flex justify-center'>
                                <img className='w-5 h-5 my-1' src={star}/>
                                <p className='w-fit h-fit px-2'>4.5</p>
                                </div>
                            </div>
                            <div className='w-full h-24 p-3 overflow-hidden'>
                                <h1 className='text-white font-bold text-2xl'>Angel Food Cake</h1>
                                <p className='text-white text-sm'>Lorem ipsum may be used as a place holder before the final copy is available.</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-b w-full h-full translate-y-full transition-transform duration-500 bg-orange-300/15 object-cover absolute flex justify-center items-center'>
                        <div className='w-1/2 h-fit py-4 px-2 text-xl cursor-pointer text-white text-center bg-orange-400 rounded-full shadow-xl card-b'>Let's Cook</div>
                    </div>
                </div>  
        ))}
          </div>
        </div>
        <h1 className='md:text-[8rem] text-[3rem] p-2 h-text2 h-fit w-fit absolute md:top-1 top-11  select-none left-0 md:left-10 d2t1'>Appetizers</h1>
        </div>
        <div className='w-[100vw] h-fit flex flex-col items-center relative d2 overflow-hidden'>
        <div className=' md:w-3/4 w-full px-2 h-24 md:mb-4 flex justify-end items-center'>
          <div className='w-36 h-18 text-2xl py-1 px-1 select-none cursor-pointer text-center border-r-8 border-t-8 shadow-md border-2 border-orange-400 rounded-full text-orange-400 transition-all duration-300 hover:text-white hover:bg-orange-400'>
            View All
          </div>
        </div>
        <div className='w-[95%] h-fit md:py-2 md:mt-5 overflow-x-scroll contain'>
          <div className='w-fit h-full flex items-center c-item'>
            {images.map((image, index) => (
                <div className='card  rounded-2xl my-2 relative overflow-hidden md:w-96 md:h-60 w-72 h-60 md:mr-6 mr-2'>
                    <div className='w-full h-full object-cover card-img transition-transform duration-500 absolute overflow-hidden'>
                        <img className=' w-96 h-60' src="https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXMlMjBjYWtlfGVufDB8fDB8fHww"/>
                    </div>
                    <div className='card-c w-full h-full bg-gradient-to-t from-zinc-800/30 to-transparent absolute'>
                        <div className='w-full h-full flex flex-col justify-between'>
                            <div className='w-full h-14 flex justify-between py-2 px-2 overflow-hidden'>
                                <div className='text-white w-fit h-full text-xl p-1 pl-2 flex justify-center bg-white/30 rounded-full border border-white/40 backdrop-blur-md'>
                                <img className='w-5 h-5 my-1' src={clock}/>
                                <p className='w-fit h-fit px-2'>25min</p>
                                </div>
                                <div className='text-white w-fit h-full text-xl flex justify-center'>
                                <img className='w-5 h-5 my-1' src={star}/>
                                <p className='w-fit h-fit px-2'>4.5</p>
                                </div>
                            </div>
                            <div className='w-full h-24 p-3 overflow-hidden'>
                                <h1 className='text-white font-bold text-2xl'>Angel Food Cake</h1>
                                <p className='text-white text-sm'>Lorem ipsum may be used as a place holder before the final copy is available.</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-b w-full h-full translate-y-full transition-transform duration-500 bg-orange-300/15 object-cover absolute flex justify-center items-center'>
                        <div className='w-1/2 h-fit py-4 px-2 text-xl cursor-pointer text-white text-center bg-orange-400 rounded-full shadow-xl card-b'>Let's Cook</div>
                    </div>
                </div>  
        ))}
          </div>
        </div>
        <h1 className='md:text-[8rem] text-[3rem] p-2 h-text2 h-fit w-fit absolute md:top-1 top-11  select-none left-0 md:left-10 d2t1'>Desserts</h1>
        </div>
        <div className='w-[100vw] h-fit flex flex-col items-center relative d2 overflow-hidden'>
        <div className=' md:w-3/4 w-full px-2 h-24 md:mb-4 flex justify-end items-center'>
          <div className='w-36 h-18 text-2xl py-1 px-1 select-none cursor-pointer text-center border-r-8 border-t-8 shadow-md border-2 border-orange-400 rounded-full text-orange-400 transition-all duration-300 hover:text-white hover:bg-orange-400'>
            View All
          </div>
        </div>
        <div className='w-[95%] h-fit md:py-2 md:mt-5 overflow-x-scroll contain'>
          <div className='w-fit h-full flex items-center c-item'>
            {images.map((image, index) => (
                <div className='card  rounded-2xl my-2 relative overflow-hidden md:w-96 md:h-60 w-72 h-60 md:mr-6 mr-2'>
                    <div className='w-full h-full object-cover card-img transition-transform duration-500 absolute overflow-hidden'>
                        <img className=' w-96 h-60' src="https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMHJlY2lwZXMlMjBjYWtlfGVufDB8fDB8fHww"/>
                    </div>
                    <div className='card-c w-full h-full bg-gradient-to-t from-zinc-800/30 to-transparent absolute'>
                        <div className='w-full h-full flex flex-col justify-between'>
                            <div className='w-full h-14 flex justify-between py-2 px-2 overflow-hidden'>
                                <div className='text-white w-fit h-full text-xl p-1 pl-2 flex justify-center bg-white/30 rounded-full border border-white/40 backdrop-blur-md'>
                                <img className='w-5 h-5 my-1' src={clock}/>
                                <p className='w-fit h-fit px-2'>25min</p>
                                </div>
                                <div className='text-white w-fit h-full text-xl flex justify-center'>
                                <img className='w-5 h-5 my-1' src={star}/>
                                <p className='w-fit h-fit px-2'>4.5</p>
                                </div>
                            </div>
                            <div className='w-full h-24 p-3 overflow-hidden'>
                                <h1 className='text-white font-bold text-2xl'>Angel Food Cake</h1>
                                <p className='text-white text-sm'>Lorem ipsum may be used as a place holder before the final copy is available.</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-b w-full h-full translate-y-full transition-transform duration-500 bg-orange-300/15 object-cover absolute flex justify-center items-center'>
                        <div className='w-1/2 h-fit py-4 px-2 text-xl cursor-pointer text-white text-center bg-orange-400 rounded-full shadow-xl card-b'>Let's Cook</div>
                    </div>
                </div>  
        ))}
          </div>
        </div>
        <h1 className='md:text-[8rem] text-[3rem] p-2 h-text2 h-fit w-fit absolute md:top-1 top-11  select-none left-0 md:left-10 d2t1'>Beverages</h1>
        </div>
    </div>
  )
}

export default All
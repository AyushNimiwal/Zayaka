import React from 'react'
import './Categories.css'
import Card from '../Card/Card';
import service from '../appwrite/conf';
function Categories() {
  const [category, setCategory] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    service.getCategory().then((result) => {
      setCategory(result);
    });
    service.getPosts().then((result) => {
      setData(result);
    });
  }, []);
  return (
    <div className='w-screen h-full bg-white z-50'>
        <h1 className=' text-[4rem] text-orange-400 px-10'>Categories</h1>
        {
          category.sort().map((item) => (
            <div className='w-[100vw] h-fit flex flex-col items-center relative d2 overflow-hidden'>
            <div className=' md:w-3/4 w-full px-2 h-24 md:mb-4 flex justify-end items-center'>
              <div className='w-36 h-18 text-2xl py-1 px-1 select-none cursor-pointer text-center border-r-8 border-t-8 shadow-md border-2 border-orange-400 rounded-full text-orange-400 transition-all duration-300 hover:text-white hover:bg-orange-400'>
                View All
              </div>
            </div>
            <div className='w-[95%] h-fit md:py-2 md:mt-5 overflow-x-scroll contain'>
              <div className='w-fit h-full flex items-center c-item'>
                  {
                    data.filter((post) => post.category.includes(item)).map((post) => (
                      <Card key={post.id} post={post} />
                    ))
                  }
              </div>
            </div>
            <h1 className='md:text-[5rem] text-[3rem] p-2 h-text2 h-fit w-fit absolute md:top-1 top-11  select-none left-0 md:left-10 d2t1'>{item[0].toUpperCase()+item.substring(1)}</h1>
            </div>
          ))
        }
    </div>
  )
}

export default Categories
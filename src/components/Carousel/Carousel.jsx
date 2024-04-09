import React, { useEffect, useState } from "react";
import star from "../../Images/star.png";
import clock from "../../Images/clock.png";
import "./Carousel.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import service from "../appwrite/conf";
gsap.registerPlugin(ScrollTrigger);
const Carousel = () => {
  const [data, setData] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const getRandomNumber = (min, max) => {
    const indexarray=[];
    while(indexarray.length!=5){
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        if(!indexarray.includes(random)){
            indexarray.push(random);
        }
    }
    return indexarray;
  };
  const handleData = () => {
    service.getPosts().then((res) => {
      const randarray = getRandomNumber(0, res.length - 1);
      for(let i=0;i<5;i++){
        service.getImage(res[randarray[i]].featuredImages[0]).then((image) => {
          res[randarray[i]].featuredImages[0]=image;
          setData((prev) => [...prev, res[randarray[i]]]);
        });
      }
    });
  };
  useEffect(() => {
    if(flag==false){
        handleData();
        setFlag(true);
    }
  }, []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 5 - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);
  const handleChange = (index) => () => {
    setCurrentImageIndex(index);
  };
  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".carousel",
        start: "top bottom",
        end: "top center",
        ease: "power3.inOut",
        scrub: 1,
      },
    });
    tl.fromTo(
      ".zay",
      {
        translateX: "100%",
      },
      {
        translateX: "0",
      },
      "a"
    ).fromTo(
      ".trend",
      {
        translateX: "-100%",
      },
      {
        translateX: "0",
      },
      "a"
    );
  }, []);
  return (
    <div className="w-[100vw] h-fit my-5 -ml-2 flex justify-center items-center relative carousel overflow-hidden">
      {data&&data.map((post, index) => (
        <div key={index} className="flex flex-col">
          <div
            className={`ccard  rounded-2xl my-6 relative overflow-hidden transition-all duration-200 ${
              index === currentImageIndex ? "scale-105" : "w-44 h-96 mx-1 hide"
            }`}
          >
            <div className="ccard-img overflow-hidden absolute transition-transform duration-500">
              <img className="object-cover w-full h-full" src={post.featuredImages[0]} />
            </div>
            <div className="ccard-c bg-gradient-to-t from-zinc-800/30 to-transparent absolute">
              <div className="w-full h-full flex flex-col overflow-hidden justify-between content">
                <div
                  className={`w-full h-14 flex justify-between py-2 px-2 overflow-hidden`}
                >
                  <div
                    className={`text-white w-fit h-full text-xl flex justify-center transition-transform duration-500 delay-150 ${
                      index === currentImageIndex
                        ? "translate-y-0"
                        : "-translate-y-full"
                    }`}
                  >
                    <img className="w-5 h-5 my-1" src={clock} />
                    <p className="w-fit h-fit px-2">{post.time}min</p>
                  </div>
                </div>
                <div
                  className={`w-full h-fit p-3 transition-transform duration-700 c-desc ${
                    index === currentImageIndex
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                >
                  <h1
                    className={`text-white font-bold ${
                      index === currentImageIndex ? "c-title-active" : "c-title"
                    } `}
                  >
                    {post.recipename}
                  </h1>
                  <p className="text-white pt-2 text-sm">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="ccard-b w-full h-full translate-y-full transition-transform duration-500 bg-orange-300/15 object-cover absolute flex justify-center items-center">
              <div className="w-1/2 h-fit py-4 px-2 text-xl cursor-pointer text-white text-center bg-orange-400 rounded-full shadow-xl card-b">
                <Link to={`/recipe/${post.$id}`}>Let's Cook</Link>
              </div>
            </div>
          </div>
          <div
            onClick={handleChange(index)}
            className={` transition-all duration-500 hide ${
              index === currentImageIndex
                ? " w-76 h-2 bg-orange-400"
                : "w-48 h-2 bg-slate-100"
            }`}
          ></div>
        </div>
      ))}
      <div className="w-fit h-fit -left-32 md:-left-44 absolute text1 -rotate-90 select-none trend">
        Trending
      </div>
      <div className="w-fit h-fit -right-32 md:-right-44 absolute text1 rotate-90 select-none zay">
        Zayaka's
      </div>
    </div>
  );
};

export default Carousel;

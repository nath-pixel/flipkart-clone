import React, { useEffect, useState } from 'react';
// import Offers from '../components/Offers';
// import RecentlyAdded from '../components/recentlyAdded';
import { IoMdStopwatch } from "react-icons/io";
import data from '../data/heroData';
import productData from '../data/product';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

// Install modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

export const calculatePercentage = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0) {
    throw new Error('Original price must be greater than zero');
  }

  const percentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return parseInt(percentage);
};



const Home = () => {

  const navigate = useNavigate();
  const [timersec, setTimersec] = useState(59);
  const [timermin, setTimermin] = useState(9);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timersec === 0 && timermin === 0) {
        // Timer has reached 0, do something
      } else if (timersec === 0) {
        setTimersec(59);
        setTimermin(timermin - 1);
      } else {
        setTimersec(timersec - 1);
      }
    }, 1000);

    // Clear timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, [timersec, timermin]);

  return (
    <>
      <Navbar />
      <div className=" flex justify-between bg-white p-2">
        {data?.filter((elem, ind) => ind < 5)?.map((elem, ind) => (
          <div className='heroCard flex flex-col justify-center align-center' key={ind}>
            <img loading='lazy'className='h-[40px]' src={elem.img} alt="error" />
            <span className='text-[12px]'>{elem.title}</span>
          </div>
        ))}
      </div>

      <div className='offerImage'>
        <div className="w-full ">
          {/* <img src="./img/img/sale.jpeg" alt="" className="w-full h-full object-contain" /> */}
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
              delay: 2000, // Set the autoplay delay to 2000 milliseconds (2 seconds)
              disableOnInteraction: false, // Optional: keeps autoplay running even after user interactions
            }}
            loop={true}
          >
            {["slider-01.jpeg",
              "slider-02.jpeg",
              "slider-03.jpeg",
              "slider-04.jpeg",
              "slider-05.jpeg",
              "slider-06.jpeg",
              "slider-07.jpeg",
              "slider-08.jpeg"].map((img, ind) => <SwiperSlide key={ind} className='h-full w-full'><img className='object-fill h-48 w-full' src={`./img/img/1.slider/${img}`} alt="err" /></SwiperSlide>)}
          </Swiper>

        </div>
        <div className="deal flex items-center justify-end bg-white h-16 p-4">
          <div style={{ color: "blue" }} className=" w-[60%] flex flex-col ">
            Deals of the Day
            <br />
            <div className='flex items-center'>
              < IoMdStopwatch /> 0{timermin}:{timersec < 10 ? `0${timersec}` : timersec}
            </div>
          </div>
          <div>
            <div className="uppercase text-red-600 bg-white shadow-md p-1">
              Sale is Live
            </div>
          </div>
        </div>
      </div >

      <section className="bg-gray-300 grid gap-1 grid-cols-auto minmax-200 mt-1" style={{ backgroundColor: "#e7e7e7", display: "grid", gap: "1px", gridTemplateColumns: "repeat(auto-fill,minmax(165px,1fr))" }}>
        {productData?.map((product, ind) => (
          <div className="  items-center bg-white cursor-pointer flex flex-col h-full justify-between p-1 text-left" key={ind} onClick={() => navigate(`/product/${product.id}`)}>
            <div className="h-[200px] p-[25px] aspect-square w-full">
              <img loading='lazy' src={product.img[0]} alt={product.title} className="h-[160px] w-full bject-scale-down " />
            </div>
            <div className="det w-full p-2 ">
              <span className='title font-roboto font-normal ' style={{ color: "#000", display: "-webkit-box", fontSize: "13px", maxHeight: "3.6rem", overflow: "hidden", textOverflow: "ellipsis" }}>{product.title}</span>

              <span className='discount text-gray-500'>{calculatePercentage(product.originalPrice, product.discountedPrice)}% off <del>{product.originalPrice}</del></span>
              <div className="flex justify-between items-center mt-1">
                <p className="text-black">₹{product.discountedPrice}</p>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" className="h-5 w-auto" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Home;
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { Link,  useParams } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import 'swiper/swiper-bundle.css';
import productData from '../data/product';
import { FaStar } from "react-icons/fa6";
import { calculatePercentage } from './Home';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const Singleproduct = () => {
  

  const { ProductId } = useParams();


  const [data,setData]=useState({});

  useEffect(()=>{
    setData( productData.find((elem) => elem.id === ProductId))
  },[ProductId])
 

  const [timersec, setTimersec] = useState(59);
  const [timermin, setTimermin] = useState(16);

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


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Autoplay interval in milliseconds
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };
  return (
    <>
      <header className='nav bg-blue-500 p-2 flex justify-between items-center'>
        <div className="left flex">
          <Link to={'/'} >
            <GrLinkPrevious color='white' size={25} />
          </Link>
          <img className='left-side-logo h-[30px]' src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fk-plus_3b0baa.png" alt="" />
        </div>
        <div className="right flex gap-2">
          <IoSearchOutline color='white' size={25} />
          <IoCartOutline color='white' size={25} />
        </div>
      </header>
      <section className="product bg-gray-300 p-0">
      
        <div className="slider-container mt-2 bg-white overflow-hidden">

        <Slider {...settings}>
          {
            data.img?.map((imgLink, ind) => (
              <div className="px-4  pb-10 w-[100vw] bg-red"  key={ind}>
              <img loading='lazy' className='w-full h-[300px] object-scale-down' src={imgLink} alt={`product image-${ind} `} />
            </div>
          
             ) )
          }
    
   
    </Slider>
         
        </div>
        <div className="info p-2 bg-white">
          <p className='productTitle font-bold font-[roboto]'>{data.title}</p>

          <div className="flex items-start">
            <StarRating rating={5} />
            <span className="ml-1 text-[13px]">(363 Ratings)</span>
            <img style={{ height: 20, width: "auto" }} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" />
          </div>
          <p className='price flex items-center font-bold text-lg'>
            <span className="font-bold mr-1 text-green-900">{calculatePercentage(data.originalPrice, data.discountedPrice)}%off</span>
             <del className="mr-2">{data.originalPrice}</del> ₹{data.discountedPrice}
          </p>
        </div>
        <div className="w-full flex items-center justify-center  text-[18px] my-1  bg-white p-2">
          Offer ends in <span className=' text-red-600'>{timermin <= 9 ? `0${timermin}` : timermin} Min {timersec < 10 ? `0${timersec}` : timersec} Sec</span>
        </div>
        {/* <div className='growth bg-white p-4 flex items-center justify-center gap-3 font-bold my-1'>
        <div className='h-30 aspect-square bg-green-100 rounded-full p-3 '>
       <SlGraph size={40} color='green'/>
       </div>
          <p>{data.discountedPrice?data.discountedPrice*6:8}+ sold in Last 7 Days</p>
        </div> */}
        <div className='growth bg-white p-5 flex items-center justify-evenly font-bold my-1'>
        <img src={"../img/img/offers.jpeg"} alt="err" />
        </div>     
        { data?.extras?.map((img,ind)=>(
  <>
  <img src={img} loading='lazy' alt={`product-img-${ind+1}`}  key={ind}/>
  </>
 ))}
        <div className='growth bg-white p-5 flex items-center justify-evenly font-bold my-1'>
        <img src={"../img/img/extras.png"} alt="err" />
        </div>    
        {

        } 
        <div className="button fixed bottom-0 w-full bg-gray-300 p-[2px] flex">
          <button className="w-1/2 bg-white border-none h-10">Add to cart</button>
          <Link to={`/checkout/${ProductId}`} className="flex items-center justify-center w-1/2 bg-yellow-400 border-none h-10">Buy Now</Link>
        </div>
      </section>
    </>
  )
}

const StarRating = ({ rating }) => {
  const stars = [];
  // Fill stars array with FaStar components based on the rating
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<FaStar key={i} color='green' />);
    } else {
      stars.push(<FaStar key={i} color='gray' />);
    }
  }
  return (
    <span className="star-rating flex">
      {stars}
    </span>
  );
};

export default Singleproduct;

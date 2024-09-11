import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productData from '../data/product';
import Stepper from '../components/Stepper';
import { GrLinkPrevious } from 'react-icons/gr';
import FloatingField from '../components/FloatingField';
import { calculatePercentage } from './Home';

const Checkout = () => {
  const { ProductId } = useParams();
  const data = productData.find((elem) => elem.id === ProductId);
  const steps = ["", "", ""];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const upiId = process.env.REACT_APP_UPIID;


  // Initialize form data state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address1: "",
    address2: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };


  const [timersec, setTimersec] = useState(59);
  const [timermin, setTimermin] = useState(6);

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


  const amountInRupees = data.discountedPrice; // Assuming data.discountedPrice contains the transaction amount in INR
const amountInThousands = (amountInRupees ); // Convert amount to thousands with two decimal places
const amountFormatted = amountInThousands  // Format the amount

const googlePayUpiPayUrl = `tez://upi/pay?pa=${upiId}&pn=Flipkart&am=${amountFormatted}&cu=INR`;
// const paytmPayUpiPayUrl = `paytm://pay?pa=9140560654@paytm&pn=Umang Sahu&am=${amountFormatted}&cu=INR&pn=%20&tr=%20 `;
const upiPayUpiPayUrl = `upi://pay?pa=${upiId}&pn=Flipkart&am=${amountFormatted}&cu=INR`;
const phonepePayUpiPayUrl = `phonepe://pay?pa=${upiId}&pn=Flipkart&am=${amountFormatted}&cu=INR`;


  return (
    <>
      <header className='w-full p-4 shadow-sm'>
        <div className='flex gap-1 my-2'>
          <Link to={'/'}>
            <GrLinkPrevious size={25} />
          </Link>
          Add delivery address
        </div>
        <Stepper complete={complete} currentStep={currentStep} steps={steps} />
      </header>

      <div className='w-full box-border'>
        {currentStep === 1 && (
          <div className='w-full p-4 bg-white h-full'>
            <form onSubmit={submitHandler}>
              <div className='flex w-full gap-2'>
                <FloatingField label={"Name(Required)"} formData={[formData, setFormData]} name={"name"} type={"text"} />
              </div>
              <div className='flex w-full gap-2'>
                <FloatingField label={"Phone(Required)"} formData={[formData, setFormData]} name={"phone"} type={"number"} />
              </div>
              <div className='flex w-full gap-2'>
                <FloatingField label={"Pincode(Required)"} formData={[formData, setFormData]} name={"pincode"} type={"number"} />
              </div>
              <div className='flex w-full gap-2'>
                <div className='w-1/2'><FloatingField label={"City(Required)"} formData={[formData, setFormData]} name={"city"} type={"text"}  /></div>
                <div className='w-1/2'><FloatingField label={"State(Required)"} formData={[formData, setFormData]} name={"state"} type={"text"} isSelect={true} /></div>
              </div>
              <div className='flex w-full gap-2'>
                <FloatingField label={"House No, Building Name(Required)"} formData={[formData, setFormData]} name={"address1"} type={"text"} />
              </div>
              <div className='flex w-full gap-2'>
                <FloatingField label={"Road Name, Area, Colony"} formData={[formData, setFormData]} name={"address2"} type={"text"} />
              </div>
              <div className='flex justify-center items-center'>
                <button type='submit' className='w-[80%] px-[20%] py-2  fixed bottom-10 bg-[#fb641b] text-white'>Save</button>
              </div>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <div className="bg-[#f1f3f6]">
            <div className='mb-2 bg-white p-2'>
              <h2 className='text-semibold text-[1.2rem]'>Delivered to:</h2>
              <p>{formData.name}</p>
              <p>{formData.address1},{formData.address2},{formData.city},{formData.state}-{formData.pincode}</p>
              <p>{formData.phone}</p>
            </div>

            <div className='bg-white px-2 py-4'>
              <div className='w-full flex items-center justify-between'>
                <div className="left w-[20%] flex flex-col items-center">
                 
                  <img loading='lazy' src={data.img[0]} alt={data.title} className="w-full aspect-square "/>
                  <p>Qty:1</p>
                </div>
                <div className="right w-[80%] p-1">
                  <p>{data.title.slice(0, 40)}</p>
                  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" className=" px-5  my-2 h-5 aspect-auto" />
                  <p className='price flex items-center  text-lg px-1'>
                    <span className="text-sm font-[400] mr-1 text-gray-600">{calculatePercentage(data.originalPrice, data.discountedPrice)}%off</span>
                    <del className="mr-2 mx-2">{data.originalPrice}</del> ₹{data.discountedPrice}
                  </p>
                </div>


              </div>
            </div>

            <div className="pricedetail mt-2 p-2 bg-white">
              <h2 className='text-semibold text-[1.2rem]'>Price Details</h2>

              <div className='flex justify-between my-5'>
                <p>Price(1 Item)</p>
                <p>₹{data.originalPrice}</p>
              </div>
              <div className='flex justify-between my-5'>
                <p>Discount</p>
                <p>-₹{data.originalPrice - data.discountedPrice}</p>
              </div>

              <div className='flex justify-between my-5'  >
                <p>Delivery Charges</p>
                <p className='font-thin text-green-600'>Free of cost</p>
              </div>

            </div>

            <div className='flex items-center justify-center w-full bg-[#f1f3f6] mt-2 p-2'>
              <img className='h-10 aspect-square' src="https://rukminim2.flixcart.com/www/80/100/promos/13/02/2019/9b179a8a-a0e2-497b-bd44-20aa733dc0ec.png?q=90" loading="lazy" alt="" />
              <div className='text-justify w-[245px]'>Safe and secure payments. Easy returns. 100% Authentic products.</div>
            </div>

            <div className='fixed bottom-0 flex w-full pt-1 '>
              <div className='w-1/2 p-2'>
                <h2 className=' text-[0.7rem]'>Price:</h2>
                <p>₹{data.discountedPrice}</p>
              </div>



              <button className='w-1/2 bg-yellow-500' onClick={() => setCurrentStep((prev) => prev + 1)}>
                Continue
              </button>
            </div>
          </div>
        )}


        {currentStep === 3 && (
          <div className="bg-[#f1f3f6]">

            <div className="flex items-center justify-center bg-white mt-3 p-2 ">
              <p className=''>Offer Ends in&nbsp;
              <span className='text-red-500'>0{timermin}:{timersec<10?`0${timersec}`:timersec}</span>
              </p> </div>
            <div className="flex flex-col">
            {/* <a href={googlePayUpiPayUrl} className="flex ">
              Pay Now by gPay !</a> */}
            {/* <a href={paytmPayUpiPayUrl} className="upi-pay1">Pay Now by paytm !</a> */}
            <a href={phonepePayUpiPayUrl} className="flex items-center justify-center gap-2 h-20 border-[1.2px] border-gray-400 m-2 rounded-md ">
               <img className='h-8' src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMzIgNDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZT4uc3Qwe2ZpbGw6IzVmMjU5Zn08L3N0eWxlPjxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoLTc2LjcxNCAxNy44NyAyNC4wMDEpIiBjbGFzcz0ic3QwIiBjeD0iMTcuOSIgY3k9IjI0IiByPSIxNy45Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTkwLjUgMzQuMnYtNi41YzAtMS42LS42LTIuNC0yLjEtMi40LS42IDAtMS4zLjEtMS43LjJWMzVjMCAuMy0uMy42LS42LjZoLTIuM2MtLjMgMC0uNi0uMy0uNi0uNlYyMy45YzAtLjQuMy0uNy42LS44IDEuNS0uNSAzLS44IDQuNi0uOCAzLjYgMCA1LjYgMS45IDUuNiA1LjR2Ny40YzAgLjMtLjMuNi0uNi42SDkyYy0uOSAwLTEuNS0uNy0xLjUtMS41em05LTMuOWwtLjEuOWMwIDEuMi44IDEuOSAyLjEgMS45IDEgMCAxLjktLjMgMi45LS44LjEgMCAuMi0uMS4zLS4xLjIgMCAuMy4xLjQuMi4xLjEuMy40LjMuNC4yLjMuNC43LjQgMSAwIC41LS4zIDEtLjcgMS4yLTEuMS42LTIuNC45LTMuOC45LTEuNiAwLTIuOS0uNC0zLjktMS4yLTEtLjktMS42LTIuMS0xLjYtMy42di0zLjljMC0zLjEgMi01IDUuNC01IDMuMyAwIDUuMiAxLjggNS4yIDV2Mi40YzAgLjMtLjMuNi0uNi42aC02LjN6bS0uMS0yLjJIMTAzLjJ2LTFjMC0xLjItLjctMi0xLjktMnMtMS45LjctMS45IDJ2MXptMjUuNSAyLjJsLS4xLjljMCAxLjIuOCAxLjkgMi4xIDEuOSAxIDAgMS45LS4zIDIuOS0uOC4xIDAgLjItLjEuMy0uMS4yIDAgLjMuMS40LjIuMS4xLjMuNC4zLjQuMi4zLjQuNy40IDEgMCAuNS0uMyAxLS43IDEuMi0xLjEuNi0yLjQuOS0zLjguOS0xLjYgMC0yLjktLjQtMy45LTEuMi0xLS45LTEuNi0yLjEtMS42LTMuNnYtMy45YzAtMy4xIDItNSA1LjQtNSAzLjMgMCA1LjIgMS44IDUuMiA1djIuNGMwIC4zLS4zLjYtLjYuNmgtNi4zem0tLjEtMi4ySDEyOC42di0xYzAtMS4yLS43LTItMS45LTJzLTEuOS43LTEuOSAydjF6TTY2IDM1LjdoMS40Yy4zIDAgLjYtLjMuNi0uNnYtNy40YzAtMy40LTEuOC01LjQtNC44LTUuNC0uOSAwLTEuOS4yLTIuNS40VjE5YzAtLjgtLjctMS41LTEuNS0xLjVoLTEuNGMtLjMgMC0uNi4zLS42LjZ2MTdjMCAuMy4zLjYuNi42aDIuM2MuMyAwIC42LS4zLjYtLjZ2LTkuNGMuNS0uMiAxLjItLjMgMS43LS4zIDEuNSAwIDIuMS43IDIuMSAyLjR2Ni41Yy4xLjcuNyAxLjQgMS41IDEuNHptMTUuMS04LjRWMzFjMCAzLjEtMi4xIDUtNS42IDUtMy40IDAtNS42LTEuOS01LjYtNXYtMy43YzAtMy4xIDIuMS01IDUuNi01IDMuNSAwIDUuNiAxLjkgNS42IDV6bS0zLjUgMGMwLTEuMi0uNy0yLTItMnMtMiAuNy0yIDJWMzFjMCAxLjIuNyAxLjkgMiAxLjlzMi0uNyAyLTEuOXYtMy43em0tMjIuMy0xLjdjMCAzLjItMi40IDUuNC01LjYgNS40LS44IDAtMS41LS4xLTIuMi0uNHY0LjVjMCAuMy0uMy42LS42LjZoLTIuM2MtLjMgMC0uNi0uMy0uNi0uNlYxOS4yYzAtLjQuMy0uNy42LS44IDEuNS0uNSAzLS44IDQuNi0uOCAzLjYgMCA2LjEgMi4yIDYuMSA1LjZ2Mi40ek01MS43IDIzYzAtMS42LTEuMS0yLjQtMi42LTIuNC0uOSAwLTEuNS4zLTEuNS4zdjYuNmMuNi4zLjkuNCAxLjYuNCAxLjUgMCAyLjYtLjkgMi42LTIuNFYyM3ptNjguMiAyLjZjMCAzLjItMi40IDUuNC01LjYgNS40LS44IDAtMS41LS4xLTIuMi0uNHY0LjVjMCAuMy0uMy42LS42LjZoLTIuM2MtLjMgMC0uNi0uMy0uNi0uNlYxOS4yYzAtLjQuMy0uNy42LS44IDEuNS0uNSAzLS44IDQuNi0uOCAzLjYgMCA2LjEgMi4yIDYuMSA1LjZ2Mi40em0tMy42LTIuNmMwLTEuNi0xLjEtMi40LTIuNi0yLjQtLjkgMC0xLjUuMy0xLjUuM3Y2LjZjLjYuMy45LjQgMS42LjQgMS41IDAgMi42LS45IDIuNi0yLjRWMjN6Ii8+PHBhdGggZD0iTTI2IDE5LjNjMC0uNy0uNi0xLjMtMS4zLTEuM2gtMi40bC01LjUtNi4zYy0uNS0uNi0xLjMtLjgtMi4xLS42bC0xLjkuNmMtLjMuMS0uNC41LS4yLjdsNiA1LjdIOS41Yy0uMyAwLS41LjItLjUuNXYxYzAgLjcuNiAxLjMgMS4zIDEuM2gxLjR2NC44YzAgMy42IDEuOSA1LjcgNS4xIDUuNyAxIDAgMS44LS4xIDIuOC0uNXYzLjJjMCAuOS43IDEuNiAxLjYgMS42aDEuNGMuMyAwIC42LS4zLjYtLjZWMjAuOGgyLjNjLjMgMCAuNS0uMi41LS41di0xem0tNi40IDguNmMtLjYuMy0xLjQuNC0yIC40LTEuNiAwLTIuNC0uOC0yLjQtMi42di00LjhoNC40djd6IiBmaWxsPSIjZmZmIi8+PC9zdmc+" alt="err" />
              Pay Now</a>
              <a href={upiPayUpiPayUrl} className="flex items-center justify-center gap-2 h-20 border-[1.2px] border-gray-400 m-2 rounded-md ">
               <img className='h-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/300px-UPI-Logo-vector.svg.png" alt="err" />
              Pay Now</a>
              <a href={googlePayUpiPayUrl} className="flex items-center justify-center gap-2 h-20 border-[1.2px] border-gray-400 m-2 rounded-md ">
               <img className='h-8' src="https://pay.google.com/about/static_kcs/images/logos/footer-logo.svg" alt="err" />
              Pay Now</a>
            </div>
            
          

            <div className="pricedetail mt-2 p-2 bg-white">
              <h2 className='text-semibold text-[1.2rem]'>Price Details</h2>
              <div className='flex justify-between my-5'>
                <p>Price(1 Item)</p>
                <p>₹{data.originalPrice}</p>
              </div>
              <div className='flex justify-between my-5'>
                <p>Discount</p>
                <p>-₹{data.originalPrice - data.discountedPrice}</p>
              </div>

              <div className='flex justify-between my-5'  >
                <p>Delivery Charges</p>
                <p className='font-thin text-green-600'>Free of cost</p>
              </div>

            </div>

            <div className='flex items-center justify-center w-full bg-[#f1f3f6] mt-2 p-2'>
              <img className='h-10 aspect-square' src="https://rukminim2.flixcart.com/www/80/100/promos/13/02/2019/9b179a8a-a0e2-497b-bd44-20aa733dc0ec.png?q=90" loading="lazy" alt="" />
              <div className='text-justify w-[245px]'>Safe and secure payments. Easy returns. 100% Authentic products.</div>
            </div>

            <div className='fixed bottom-0 flex w-full pt-1 bg-white '>
              <div className='w-1/2 p-2'>
                <h2 className=' text-[0.7rem]'>Price:</h2>
                <p>₹{data.discountedPrice}</p>
              </div>



              <button className='w-1/2 bg-yellow-500' onClick={() => setCurrentStep((prev) => prev + 1)}>
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      {!complete && currentStep > 3 && (
        <div className='w-full flex justify-center items-center p-30'>
          <button
            className="btn w-[80%] px-[20%] py-2  fixed bottom-10 bg-[#fb641b] text-white"
            onClick={() => {
              currentStep === steps.length
                ? setComplete(true)
                : setCurrentStep((prev) => prev + 1);
            }}
          >
            {currentStep === (steps.length - 1) ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </>
  );
};

export default Checkout;

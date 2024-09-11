import React from 'react'
import "../styles/floatingField.css"

export const indianStates = [
  { value: 'AN', label: 'Andaman and Nicobar Islands' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'DN', label: 'Dadra and Nagar Haveli' },
  { value: 'DD', label: 'Daman and Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu and Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PY', label: 'Puducherry' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TS', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UK', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' }
];
const FloatingField = ({ type, label, formData, name, isSelect }) => {
  const [data, setData] = formData;

  // Event handler to update the data state when input field changes
  const handleChange = (e) => {
    if(type==="text"){
      setData({ ...data, [name]: !isSelect ?e.target.value : e.value });
    }
    else if(type==="number"){
      if(e.target.value[e.target.value.length-1]-'0'>=0&&e.target.value[e.target.value.length-1]-'0'<=9){
         if(name==="pincode"&&e.target.value.length<=6){
        setData({ ...data, [name]: e.target.value});}
        else if(name==="phone"&&e.target.value.length<=10){
          setData({ ...data, [name]:e.target.value });}
        }
        else if(e.target.value.length===0&&data[name].length===1){
          setData({ ...data, [name]:""});
        }

      }

    }
     
  





  if (isSelect) {
    return (<>
      <div className='input-container w-full relative h-[40px] my-2'>
        <select id="tech-giants" name="tech-giants" className='input absolute h-10 w-full bg-white outline-none border-[1px] border-[#b3b3b3] transition ease-in-out delay-150 z-111 px-3 py-2'>
          {
            indianStates.map(({ value, label }, ind) => (
              <option value={value} key={ind}>{label}</option>
            ))
          }
        </select>
        <label for={name} className="label pointer-events-none absolute mx-4 px-1 py-[9px] transition ease-in-out delay-150 text-[#b3b3b3] z-90" required>{label}</label>
      </div>
    </>)
  }
  return (
    <>
      <div className='input-container w-full relative h-[40px] my-2'>
        <input type={type}
          name={name}
          id={"input"}
          value={data[name]} // Accessing the value from data object using dynamic property
          className='input absolute h-10 w-full outline-none border-[1px] border-[#b3b3b3] transition ease-in-out delay-150 z-111 px-3 py-2'
          onChange={handleChange} // Call handleChange when input value changes
          required 
          maxLength={10}
          />
        <label for={name} className="label pointer-events-none absolute mx-4 px-1 py-[9px] transition ease-in-out delay-150 text-[#b3b3b3] z-90" required>{label}</label>
      </div>
    </>
  )
}

export default FloatingField

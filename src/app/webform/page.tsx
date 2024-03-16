// pages/webform.tsx
'use client'
import { log } from "console";
import { response } from "express";
import React, { useEffect, useState } from "react";

const WebForm: React.FC = () => {
  // const [options,setOptions]=useState({});
  // const [options, setOptions] = useState<Option[]>([]);
  // const [selectedOption, setSelectedOption] = useState<Option[]>([]);
  interface OptionType {
    label: string;
    value: string;
  }
  
  const [options, setOptions] = useState<OptionType[]>([]);
  




useEffect(()=>{
  const getOptions=async()=>{
    try {
      const getApi=await fetch("/api/register")
      
      const result=await getApi.json();
    

      console.log(result,'reeeeeeeeeeeeeeeeeeeeeeeeeee');
      setOptions(prev=>([...prev,result]));
     
      console.log('option from rout api',options);
      
    } catch (error) {
      // log('error occured',error)
      console.log('bute');

      
    }
   
    
  }
  getOptions();

},[])



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl p-6 bg-gray-100 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          EXTREME REIS LEADS
        </h1>

        {/* Dropdown */}
        <select value='select your name' className="block mb-1 text-black" style={{ color: 'black' }}>
  <option value="">Select an option</option>
  {options.map((option, index) => (
    <option key={index} value={option.value} className="text-black">
      {option.label}
    </option>
  ))}
</select>



        {/* tring dropdown------------ */}
        {/* <div className="mb-4 block  text-black" >
          <label htmlFor="sellerInfo" >Lead Created By</label>
          <span className="mb-6  text-black" >
          <select value='select' >
            <option value='ali'></option>
            <option value='ali'></option>
          </select>
          </span>
          
        </div> */}
        {/* Input for seller's information */}
        <div className="mb-4">
          <label htmlFor="sellerInfo" className="block mb-1 text-black">
            Seller's Information
          </label>
          <input
            type="text"
            id="sellerInfo"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter seller's phone number, email, or other"
          />
        </div>

        {/* Input for property address */}
        <div className="mb-4">
          <label htmlFor="propertyAddress" className="block mb-1 text-black">
            Property Address
          </label>
          <input
            type="text"
            id="propertyAddress"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter property address"
          />
        </div>

        {/* Note section */}
        <div className="mb-4">
          <label htmlFor="note" className="block mb-1 text-black">
            Note
          </label>
          <textarea
            id="note"
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            placeholder="Enter note here"
          ></textarea>
        </div>

        {/* Motivation and ideal price */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="motivation" className="block mb-1 text-black">
              Motivation
            </label>
            <input
              type="text"
              id="motivation"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter seller's motivation"
            />
          </div>
          <div>
            <label htmlFor="idealPrice" className="block mb-1 text-black">
              Seller's Ideal Price
            </label>
            <input
              type="text"
              id="idealPrice"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter seller's ideal price"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebForm;

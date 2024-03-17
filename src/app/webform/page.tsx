// pages/webform.tsx
"use client";
import { log } from "console";
import { response } from "express";
import { IntegerType } from "mongodb";
import React, { useEffect, useState } from "react";

const WebForm: React.FC = () => {
  // const [options,setOptions]=useState({});
  // const [options, setOptions] = useState<Option[]>([]);
  // const [selectedOption, setSelectedOption] = useState<Option[]>([]);
  interface OptionType {
    _id: number;
    username: string;
  }

  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const getApi = await fetch("/api/register");

        const result = await getApi.json();

        console.log(result.options, "reeeeeeeeeeeeeeeeeeeeeeeeeee");
        // setOptions((prev) => {...prev, result}));
        setOptions(result.options);
        // setOptions(...result,result)

        // setOptions([
        //   { label: "Option 1", value: "option1" },
        //   { label: "Option 2", value: "option2" },
        //   // Add more options as needed
        // ]);
      } catch (error) {
        // log('error occured',error)
        console.log("bute");
      }
    };
    getOptions();
    console.log("option from rout api", options);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <div className="w-full max-w-xl p-6 bg-gray-100 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          EXTREME REIS LEADS
        </h1>

        {/* Dropdown */}
        <div className="mb-4">
          <label>Leads Created By</label>
        </div>
        <div className="mb-4 text-black">
          <select
            value="select your name"
            className="w-full px-3 py-2 border rounded-md"
            style={{ color: "black" }}
          >
            <option value="" className="w-full px-3 py-2 border rounded-md">
              Select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option._id} className="text-black">
                {option.username}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="sellerInfo" className="block mb-1 text-black">
            Seller's Name
          </label>
          <input
            type="text"
            id="sellerInfo"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter seller's phone number, email, or other"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sellerInfo" className="block mb-1 text-black">
            Seller's OpenPhone/Dialpad Account
          </label>
          <input
            type="text"
            id="sellerInfo"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter seller's phone number, email, or other"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sellerPhone" className="block mb-1 text-black">
            Seller's Phone
          </label>
          <div className="w-full border-solid hover:border-dotted">
            <select>
              <option>Other</option>
              <option>two</option>
            </select>
            <input  type="text"
            id="sellerPhone"
            // className="w-full px-1 py-1 border rounded-md"
            className="w-5/6 px-1 py-1 border rounded-md"
            placeholder="Enter seller's phone number"></input>
          </div>
        </div>
       
        
        <div className="mb-4">
          <label htmlFor="sellerPhone" className="block mb-1 text-black">
            Seller's Email
          </label>
          <div className="w-full border-solid hover:border-dotted">
            <select>
              <option>Other</option>
              <option>two</option>
            </select>
            <input  type="text"
            id="sellerPhone"
            // className="w-full px-1 py-1 border rounded-md"
            className="w-5/6 px-1 py-1 border rounded-md"
            placeholder="Enter seller's phone number"></input>
          </div>
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
        <div className=" mb-4">
          <div>
            <label htmlFor="motivation" className="block mb-1 text-black">
              Motivation
            </label>
            <select className="w-full px-3 py-2 border rounded-md" >
            <option>
             Please select
              </option>
              <option>
                second
              </option>
            </select>
           
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

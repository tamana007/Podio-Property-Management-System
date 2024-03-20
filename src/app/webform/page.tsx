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
  const [userName, setUserName] = useState<string>("");
  const [sellerName, setSellerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otherPhone, setOtherPhone] = useState<string>("");
  const [sellerEmail, setSellerEmail] = useState<string>("");
  const [propertyAddress, setPropertyAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [motivation, setMotivation] = useState<string>("");
  const [idealPrice, setIdealPrice] = useState<number | undefined>(undefined);

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setUserName(selectedValue);
    // console.log('optionsss',userName);
  };
  const handleSellerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const change = e.target.value;
    setSellerName(change);
    // console.log('selerrrr',sellerName);
  };
  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    console.log("phone", phoneNumber);
  };
  const handleOtherPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherPhone(e.target.value);
    // console.log('other phone',otherPhone);
  };
  const handleOtherEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerEmail(e.target.value);
    console.log("email", sellerEmail);
  };

  const handlePropertyAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyAddress(e.target.value);
    console.log("property address", propertyAddress);
  };
  const handleNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    console.log("notes", notes);
  };
  const handleMotivation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMotivation(e.target.value);
    console.log("motivation", motivation);
  };
  const handleIdealPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    setIdealPrice(price);
    console.log("ideal price", idealPrice);
  };
  const data = {
    idealPrice,
    motivation,
    notes,
    propertyAddress,
    sellerEmail,
    otherPhone,
    phoneNumber,
    sellerName,
    userName,
  };
  const handleSubmit=()=>{
    console.log('submitted');
    console.log('data----------',data);
    
    
  }

  useEffect(() => {
    const getOptions = async () => {
      try {
        const getApi = await fetch("/api/register");

        const result = await getApi.json();
        setOptions(result.options);
      } catch (error) {
        console.log("error fetching users", error);
      }
    };
    getOptions();
    console.log("option from rout api", options);
  }, []);

  return (
    // <div className="flex justify-center items-center h-screen text-black">
    <div className="flex justify-center items-center min-h-screen text-black">
      <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Texas Propmover LLC LEADS
        </h1>

        {/* Dropdown */}
        <div className="mb-4">
          <label>Leads Created By</label>
        </div>
        <div className="mb-4 text-black">
          <select
            onChange={handleNameChange}
            className="w-full px-3 py-2 border rounded-md"
            style={{ color: "black" }}
          >
            <option value="" className="w-full px-3 py-2 border rounded-md">
              Select your Name
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={option.username}
                className="text-black"
              >
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
            onChange={handleSellerNameChange}
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
            onChange={handlePhoneNumber}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sellerPhone" className="block mb-1 text-black">
            Seller's Phone
          </label>
          <div className="w-full border-solid hover:border-dotted">
            <input
              type="text"
              id="sellerPhone"
              onChange={handlePhoneNumber}
              className="w-full px-1 py-1 border rounded-md"
              placeholder="Enter seller's phone number"
            ></input>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="sellerPhone" className="block mb-1 text-black">
            Seller's Email
          </label>
          <div className="w-full border-solid hover:border-dotted">
            <input
              type="text"
              onChange={handleOtherPhone}
              id="sellerPhone"
              className="w-full px-1 py-1 border rounded-md"
              placeholder="Enter seller's phone number"
            ></input>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="sellerPhone" className="block mb-1 text-black">
            Other Email
          </label>
          <div className="w-full border-solid hover:border-dotted">
            <input
              type="text"
              onChange={handleOtherEmail}
              id="sellerPhone"
              className="w-full px-1 py-1 border rounded-md"
              placeholder="Enter seller's phone number"
            ></input>
          </div>
        </div>
        {/* Input for property address */}
        <div className="mb-4">
          <label htmlFor="propertyAddress" className="block mb-1 text-black">
            Property Address
          </label>
          <input
            onChange={handlePropertyAddress}
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
            onChange={handleNotes}
            id="note"
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            placeholder="Enter note here"
          ></textarea>
        </div>

        <div className=" mb-4">
          <div>
            <label htmlFor="motivation" className="block mb-1 text-black">
              Motivation
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              onChange={handleMotivation}
            >
              <option>Please select</option>
              <option>Motivated</option>
              <option>Not Motivated</option>
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
              onChange={handleIdealPrice}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button 
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebForm;

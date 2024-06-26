// pages/webform.tsx
"use client";
import { log } from "console";
import { response } from "express";
import { IntegerType } from "mongodb";
import React, { ReactEventHandler, use, useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import { usePodioStore } from "../podioStore";
import Dashboard from "@/app/Components/Dashboard";
// import {usePodioStore} from '@/app/podioStore'

// Define the interface for props in WebForm component
interface WebFormProps {
  id: number;
}
const WebForm: React.FC = () => {
  //I want to add UserName from here to store...

  const podioStore = usePodioStore(); // Use the store
  const {email}=usePodioStore();
  // console.log("podio store from add lead", podioStore);

  interface OptionType {
    _id: number;
    username: string;
  }

  interface DataType {
    mleadId: number;
    createdBy: string;
    sellerName: string;
    sellerPhone: number;
    sellerOtherPhone: number;
    sellerEmail: string;
    otherEmail: string;
    address: string;
    note: string;
    motivation: string;
    idealPrice: number;
  }

  const initialData: DataType = {
    mleadId: 0,
    createdBy: "",
    sellerName: "",
    idealPrice: 0,
    note: "",
    otherEmail: "",
    sellerEmail: "",
    address: "",
    sellerPhone: 777777,
    sellerOtherPhone: 3333,
    motivation: "",
  };
  const [allData, setallData] = useState(initialData);
  const [submit, setSubmit] = useState<boolean>(true);
  //Users form mentionin
  const [users, setUsers] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setallData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log("input chningg", value);
    podioStore.setUserName(allData.createdBy);
    // console.log("podio store after usernamae added", podioStore);
  };
  const [options, setOptions] = useState<OptionType[]>([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let userId = options.map((op) => op._id);

    try {
      const sendData = await fetch(`/api/webform?user=${allData.createdBy}`, {
        method: "POST",
        body: JSON.stringify({
          ...allData,
          mleadId: allData.mleadId.toString(),
        }),
      });
    } catch (error) {}
    setSubmit(!submit);
  };

  useEffect(() => {
    //set the users names in mentioned state of store
    const names: string[] = options.map((option) => option.username);
    podioStore.setMentionedUser(names);
  }, []);

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
    <>
      {
      // submit ? (
        <AdminLayout>
          <div className="flex justify-center items-center h-full text-black">
            <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-lg">
              <h1 className="text-3xl font-bold mb-6 text-center text-black">
                Texas Propmover LLC LEADS :Helloe {email}
              </h1>
              <div className="mb-4">
                <label htmlFor="sellerInfo" className="block mb-1 text-black">
                  Lead Id
                </label>
                <input
                  name="mleadId"
                  type="text"
                  id="mleaId"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter seller's phone number, email, or other"
                  onChange={handleInputChange}
                />
              </div>
              {/* Dropdown */}
              <div className="mb-4">
                <label>Leads Created By</label>
              </div>
              <div className="mb-4 text-black">
                <select
                  name="createdBy"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ color: "black" }}
                >
                  <option
                    value=""
                    className="w-full px-3 py-2 border rounded-md"
                  >
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
                  name="sellerName"
                  type="text"
                  id="sellerInfo"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter seller's phone number, email, or other"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="sellerInfo" className="block mb-1 text-black">
                  Seller's OpenPhone/Dialpad Account
                </label>
                <input
                  name="sellerPhone"
                  type="text"
                  id="sellerInfo"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter seller's phone number, email, or other"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="sellerPhone" className="block mb-1 text-black">
                  Seller's Phone
                </label>
                <div className="w-full border-solid hover:border-dotted">
                  <input
                    name="sellerOtherPhone"
                    type="text"
                    id="sellerPhone"
                    onChange={handleInputChange}
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
                    name="sellerEmail"
                    type="text"
                    onChange={handleInputChange}
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
                    name="otherEmail"
                    type="text"
                    onChange={handleInputChange}
                    id="sellerPhone"
                    className="w-full px-1 py-1 border rounded-md"
                    placeholder="Enter seller's phone number"
                  ></input>
                </div>
              </div>
              {/* Input for property address */}
              <div className="mb-4">
                <label
                  htmlFor="propertyAddress"
                  className="block mb-1 text-black"
                >
                  Property Address
                </label>
                <input
                  name="address"
                  onChange={handleInputChange}
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
                  name="note"
                  onChange={handleInputChange}
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
                    name="motivation"
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={handleInputChange}
                  >
                    <option>Please select</option>
                    <option value="motivated">Motivated</option>
                    <option value="Not Motivated">Not Motivated</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="idealPrice" className="block mb-1 text-black">
                    Seller's Ideal Price
                  </label>
                  <input
                    name="idealPrice"
                    type="text"
                    id="idealPrice"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter seller's ideal price"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </AdminLayout>
      // ) : (
        // <div>submitted</div>
        // <Dashboard />
      // )
      }
    </>
  );
};

export default WebForm;

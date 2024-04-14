// pages/Dashboard.tsx
"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AdminLayout from "@/app/Components/AdminLayout";
import { FiPaperclip } from "react-icons/fi";

const Page: React.FC = () => {
  interface DataType {
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

  const [lead, setLead] = useState<DataType[]>([]);
  const [selectedLead, setSelectedLead] = useState<DataType | null>(null);
  const [comment,setComment]=useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLeadClick = (leadItem: DataType) => {
    setSelectedLead(leadItem);
  };

  const commentFunc=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setComment(e.target.value)
    console.log('coment..',comment);
    

  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
    console.log("uploading..");
  };

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("share btn clicked");
  };

  useEffect(() => {
    const toFetch = async () => {
      const fetchLead = await fetch(`/api/dashboard`);
      const res = await fetchLead.json();
      const finalResult = res.leads;
      // console.log("res-------------", res);
      // console.log("res.lead==========================", res.leads);

      setLead(finalResult);
    
    };
    toFetch();
  }, []);

  return (
    <AdminLayout>
      <div className="flex h-screen bg-gray-100">
        {/* Left Section */}
        <div className="w-1/2 p-4 border-r">
          {selectedLead && (
            <div className="bg-white rounded-lg shadow-md p-6 text-black">
              <form
                className="flex-col"
                onSubmit={handleShare}
              >
                <textarea
                onChange={(e)=>{commentFunc(e)}}
                value={comment}
                  placeholder="Enter your comment..."
                  className="w-full h-8 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  name="comment"
                ></textarea>
                <div className="flex justify-between mb-4 mt-4">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <FiPaperclip
                    className="text-gray-600 cursor-pointer hover:text-gray-900"
                    size={24}
                    onClick={handleAttachmentClick}
                  />
                  <button
                    // onClick={handleShare}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded-md transition duration-300 mr-2"
                  >
                    Share
                  </button>
                  {/* <div className="absolute bottom-0 right-0 flex items-center"> */}
                </div>
              </form>
              <h2 className="text-xl font-semibold mb-4">Lead Details</h2>

              <p>CreatedBy: {selectedLead.createdBy}</p>
              <p>Location: {selectedLead.address}</p>
              <p>SellerName: {selectedLead.sellerName}</p>

              {/* Display other details here */}
            </div>
          )}
        </div>
        {/* Right Section */}
        <div className="w-1/2 p-4">
          <h1 className="text-xl font-semibold mb-4 text-black">
            Leads Created By
          </h1>
          <div className="flex justify-between">
            {/* <h2 className="text-xl font-semibold mb-4 text-black">
            Overall Count:
          </h2> */}
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#7a7575" }}
            >
              Overall Count:
            </h2>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#7a7575" }}
            >
              600
            </h2>
          </div>

          {lead.map((item, index) => (
            <div
              key={index}
              className=" cursor-pointer bg-white rounded-lg shadow-md p-6 mb-4 text-black"
              onClick={() => handleLeadClick(item)}
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">{item.createdBy}</h2>
                <h2 className="text-xl font-semibold mb-4">
                  Count {item.createdBy}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;

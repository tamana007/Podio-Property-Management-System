// pages/Dashboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/Components/AdminLayout";

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

  const handleLeadClick = (leadItem: DataType) => {
    setSelectedLead(leadItem);
  };

  useEffect(() => {
    const toFetch = async () => {
      const fetchLead = await fetch(`/api/dashboard`);
      const res = await fetchLead.json();
      const finalResult = res.leads;
      console.log("res-------------", res);
      console.log("res.lead==========================", res.leads);

      setLead(finalResult);
      // setLead((prev)=>({...prev,res}))
      // setLead((prev)=>({...prev,finalResult}))
      console.log(
        "leaddddd deted--------------------------------------------",
        lead
      );
      console.log(typeof lead);
    };
    toFetch();
  }, []);

  return (
    <AdminLayout>
      {/* Page Content */}
      {/* <div>
       */}

      <div className="flex h-screen bg-gray-100">
        {/* Left Section */}
        <div className="w-1/2 p-4 border-r">
          {selectedLead && (
            <div className="bg-white rounded-lg shadow-md p-6 text-black">
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
          <h2 className="text-xl font-semibold mb-4" style={{color:"#7a7575"}}>Overall Count:</h2>
                <h2 className="text-xl font-semibold mb-4"style={{color:"#7a7575"}}>600</h2>
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

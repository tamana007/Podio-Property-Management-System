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
  // const initialData: DataType = {
  //   createdBy: "",
  //   sellerName: "",
  //   idealPrice: 0,
  //   note: "",
  //   otherEmail: "",
  //   sellerEmail: "",
  //   address: "",
  //   sellerPhone: 777777,
  //   sellerOtherPhone: 3333,
  //   motivation: "",
  // };

  const [lead, setLead] = useState<DataType[]>([]);

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
      <div>
        <div className="flex h-screen bg-gray-100">
          {/* Main content */}
          <div className="flex-1 p-4">
            {/* {
          lead.map(()=>{})
        } */}
            {lead.map((item) => {
              return <div>
                
                
                <div className="bg-black rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Welcome to the Dashboard
              </h2>
              {/* Your dashboard content here */}
            </div>
                
                
                
                </div>;
            })}
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;

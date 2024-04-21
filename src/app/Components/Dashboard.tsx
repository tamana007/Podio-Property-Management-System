'use client'
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "@/app/Components/AdminLayout";
import { FiPaperclip, FiMapPin } from "react-icons/fi";
import { usePodioStore } from "../podioStore";
import { formatTimeAgo } from "../helpingFunctions/formatTimeAgo";
import { extractBeforeAt } from "../helpingFunctions/extractBeforeAt";
import GoogleMapContainer from "@/app/Components/GoogleMapContainer";

interface DataType {
  _id: number;
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

interface DataTypetwo {
  commenter: string;
  time: Date;
  comment: string;
  leadId: number;
}

const Page: React.FC = () => {
  const podioStore = usePodioStore();
  const { email } = usePodioStore(); // Access the email from the store

  const [lead, setLead] = useState<DataType[]>([]);
  const [selectedLead, setSelectedLead] = useState<DataType | null>(null);
  const [mleadId, setmLeadId] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [fetchComments, setFetchComment] = useState<DataTypetwo[] | null>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [commenter, setCommenter] = useState<string>("user");
  const [time, setTime] = useState<Date>(new Date());
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [googleMapLoaded, setGoogleMapLoaded] = useState<boolean>(false);

  const handleLeadClick = (leadItem: DataType) => {
    setSelectedLead(leadItem);
    setmLeadId(leadItem.mleadId); // Set mleadId when lead is clicked
    setCommenter(extractBeforeAt(email));
    podioStore.setEmail(email);
    fetchComment(leadItem.mleadId);
  };

  const commentFunc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const fetchComment = async (mleadId: number) => {
    try {
      const response = await fetch(`/api/comment?id=${mleadId}`);
      if (response.ok) {
        const result = await response.json();
        setFetchComment(result);
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    } catch (error) {
      console.log("error receiving comments", error);
    }
  };

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!mleadId) {
        console.error("mleadId is not set");
        return;
      }
      const sendComment = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ commenter, time, comment, mleadId }),
      });
      const res = await sendComment.json();
      setComment("");
      fetchComment(mleadId);
      if (res.ok) {
        console.log("result received", res);
      }
    } catch (error) {
      console.log("errerrr", error);
    }
  };

  const handleShareLocation = () => {
    const googleMapsUrl = "https://www.google.com/maps";
    const googleMapsTab = window.open(googleMapsUrl, "_blank");

    const urlChangeListener = (event: MessageEvent) => {
      
      if (event.origin === "https://www.google.com") {
      console.log('URL EVENT LISTENED');

        const googleMapsUrl = event.data;
        const match = googleMapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) {
          const newLatitude = parseFloat(match[1]);
          const newLongitude = parseFloat(match[2]);
          setLatitude(newLatitude);
          setLongitude(newLongitude);
          googleMapsTab?.close();
        }
      }
    };

    window.addEventListener("message", urlChangeListener);

    if (googleMapsTab) {
      googleMapsTab.onbeforeunload = () => {
        window.removeEventListener("message", urlChangeListener);
      };
    }
  };

  useEffect(() => {
    const toFetch = async () => {
      const fetchLead = await fetch(`/api/dashboard`);
      const res = await fetchLead.json();
      setLead(res.leads);
    };
    toFetch();
  }, []);



  return (
    <AdminLayout>
      <div className="flex bg-gray-100">
        <div className="w-1/2 p-4 border-r">
          {selectedLead && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 text-black">
                <form className="flex-col" onSubmit={handleShare}>
                  <textarea
                    onChange={commentFunc}
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
                      className="text-teal-600 cursor-pointer hover:text-gray-900"
                      size={24}
                      onClick={handleAttachmentClick}
                    />
                    <FiMapPin
                      className="text-teal-600 cursor-pointer hover:text-gray-900 ml-2"
                      size={24}
                      onClick={handleShareLocation}
                    />
                    {/* <button onClick={handleShareLocation}>
                      Share Location
                    </button>
                    {latitude !== null && longitude !== null && (
                      <p>
                        Latitude: {latitude}, Longitude: {longitude}
                      </p>
                    )} */}
                    <button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-1 px-4 rounded-md transition duration-300 mr-2"
                    >
                      Post
                    </button>
                  </div>
                </form>
                <h2 className="text-xl font-semibold mb-4">Lead Details</h2>
                <p>CreatedBy: {selectedLead.createdBy}</p>
                <p>Location: {selectedLead.address}</p>
                <div className="mt-4 ml-0 mr-0">
                <GoogleMapContainer/>

                </div>

              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-black mt-5">
                <p>Show All Comments: welcome to {email}</p>
                {fetchComments?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 text-black mt-5"
                  >
                    <div className="flex">
                      <p className="mr-20">{item.commenter}</p>
                      <p>
                        {formatTimeAgo(new Date(item.time).toLocaleString())}
                      </p>
                    </div>
                    <p>{item.comment}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-xl font-semibold mb-4 text-black">
            Leads Created By
          </h1>
          <div className="flex justify-between">
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
              className="cursor-pointer bg-white rounded-lg shadow-md p-6 mb-4 text-black"
              onClick={() => handleLeadClick(item)}
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">{item.createdBy}</h2>
                <h2>leadId {item.mleadId}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="map" style={{ height: "400px" }}></div>
    </AdminLayout>
  );
};

export default Page;

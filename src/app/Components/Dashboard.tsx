"use client";
import React, { FormEvent, ReactEventHandler, useEffect, useRef, useState } from "react";
import AdminLayout from "@/app/Components/AdminLayout";
import { FiPaperclip, FiMapPin } from "react-icons/fi";
import { FaCommentDots, FaPlus, FaMinus } from "react-icons/fa";
import socket from "../utils/socket";
import { usePodioStore } from "../podioStore";
import { formatTimeAgo } from "../helpingFunctions/formatTimeAgo";
import { extractBeforeAt } from "../helpingFunctions/extractBeforeAt";
import GoogleMapContainer from "@/app/Components/GoogleMapContainer";
import Activity from "@/app/Components/Activity";
// const Profile = dynamic(() => import("./Profile"), { ssr: false });
import Profile from "./Profile";
// import { useRouter } from 'next/router';
import Link from 'next/link';

interface DataType {
  createdBy: string;
  leadId: string;
  _id: number;
  mleadId: number;
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

interface LeadItem extends DataType {
  createdBy: string;
  leadId: string;
}

const Page: React.FC = () => {

  const podioStore = usePodioStore();
  const { email } = usePodioStore();
  const { mentionedUser } = usePodioStore();
  const { identity } = usePodioStore();

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
  const [expand, setExpand] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [allcomments, setAllcomments] = useState<boolean>(false);
  const [createdBy, setCreatedBy] = useState<string>("");
  const [mentionedComment, setMentionedComment] = useState<string[]>([]);
  const [foundUser, setFoundUser] = useState<string>("");
  const [atClicked, setAtClicked] = useState<boolean>(false);
  const [isMentioned, setIsMentioned] = useState(false);
  const [mentionedName, setMentionedName] = useState<string>("");
  const [notifyUser, setNotifyUser] = useState<string>();
  const [sendNotificationto, setSentNotificationto] = useState<boolean>(false);
  const [uniqueNames, setUniqueNames] = useState<string[]>([]);
  const [groupedLeads, setGroupedLeads] = useState<Record<string, LeadItem[]>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [showProfile,setShowProfile]=useState(false);

  // const router = useRouter();



  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080');
  //   ws.onopen = () => {
  //     console.log('Connected to WebSocket server');
  //   };
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  const handleLeadClick = (leadItem: DataType) => {
    setSelectedLead(leadItem);
    setmLeadId(leadItem.mleadId);
    setCommenter(extractBeforeAt(email));
    fetchComment(leadItem.mleadId);
    setAddress(leadItem.address);
    setCreatedBy(leadItem.createdBy);
    // console.log('fetched comment',fetchComments);
    
  };

  const toggleGroup = (createdBy: string) => {
    setExpandedGroups((prevExpandedGroups) => ({
      ...prevExpandedGroups,
      [createdBy]: !prevExpandedGroups[createdBy],
    }));
  };

  const combineCreatedByItems = (leads: LeadItem[]) => {
    const groupedLeads: Record<string, LeadItem[]> = {};
    leads.forEach((lead) => {
      if (!groupedLeads[lead.createdBy]) {
        groupedLeads[lead.createdBy] = [];
      }
      groupedLeads[lead.createdBy].push(lead);
    });
    return groupedLeads;
  };

  React.useEffect(() => {
    setGroupedLeads(combineCreatedByItems(lead));
  }, [lead]);

  useEffect(() => {
    const uniqueUserName: Set<string> = new Set();
    const users = lead.map((item) => {
      uniqueUserName.add(item.createdBy);
    });
    const uniqueNamesArray: string[] = Array.from(uniqueUserName);
    setMentionedComment(uniqueNamesArray);
  }, [mleadId]);

  const commentFunc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (e.target.value.includes("@")) {
      const atIndex = e.target.value.indexOf("@");
      const spaceIndex = e.target.value.indexOf(" ", atIndex);
      if (spaceIndex === -1 || spaceIndex === atIndex + 1) {
        setAtClicked(true);
      } else {
        setAtClicked(false);
      }
    } else {
      setAtClicked(false);
    }
  };

  function mentionFunc(user: string) {
    setFoundUser(user);
    setAtClicked(!atClicked);
  }

  useEffect(() => {
    if (foundUser) {
      setComment(foundUser);
      setAtClicked(false);
      setIsMentioned(true);
    }
  }, [foundUser]);

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
    console.log('click attachment');
    
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file selection here
    const file = e.target.files[0];
    // You can perform additional operations with the selected file
    if (file) {
      console.log('Selected file:', file);
      // Additional operations with the file
    }
    // console.log('Selected file:', file);
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
      // fetchComment(mleadId);
      
      fetchComments && setFetchComment([...fetchComments, { commenter, time, comment, leadId:mleadId }])

      if (res.ok) {
        console.log("result received", res);
        console.log('fetch user object',fetchComments);
        
      }

      const commentWords = comment.split(" ");
      const firstWord = commentWords[0];

      setNotifyUser(firstWord);
    } catch (error) {
      console.log("errerrr", error);
    }
  };
  // const handleProfileClick = () => {
  //   router.push('/profile');
  // };
 

  const handleShareLocation = () => {
    const googleMapsUrl = "https://www.google.com/maps";
    const googleMapsTab = window.open(googleMapsUrl, "_blank");

    const urlChangeListener = (event: MessageEvent) => {
      if (event.origin === "https://www.google.com") {
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
    <>
      {showProfile ? <Profile fetchComments={fetchComments} /> :(

    <AdminLayout>
       <div className="text-blue-500">
          <button type="button" onClick={()=>{setShowProfile(true)}}>Show Profile</button>
         </div>

  
      <div className="flex bg-gray-100">
      
        <div className="w-1/2 p-4 border-r">
          {selectedLead && (
            <>
              {/* LEFT SECTION :COMMENTS:::::::::::::::::::::::::::::::::::::::*/}

              <div className="bg-white rounded-lg shadow-md p-6 text-black">
                <form className="flex-col" onSubmit={handleShare}>
                  <div>
                    <textarea
                      onChange={commentFunc}
                      value={comment}
                      placeholder="Enter your comment..."
                      className="w-full h-8 rounded-md border border-gray-300 focus:border-indigo-100 focus:outline-none "
                      name="comment"
                    ></textarea>

                    {/* Mention Users list  */}
                    {atClicked && (
                      <div className="bg-white rounded-lg shadow-md text-black">
                        <ul>
                          {mentionedComment?.map((user, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                mentionFunc(user);
                              }}
                              className="px-3 py-1 cursor-pointer hover:bg-gray-200"
                            >
                              {user}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

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
                      // onChange={handleFileChange}
                    />
                    <FiMapPin
                      className="text-teal-600 cursor-pointer hover:text-gray-900 ml-2"
                      size={24}
                      onClick={handleShareLocation}
                    />

                    <button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-1 px-4 rounded-md transition duration-300 mr-2"
                    >
                      Post
                    </button>
                  </div>
                </form>
                {/* Render formatted comment */}

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100">
                    Lead Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4 px-4 py-2">
                    <div>
                      <p className="font-semibold">Created By:{identity}</p>
                      <p className="font-semibold">Location:</p>
                      <p className="font-semibold">Seller Name:</p>
                      <p className="font-semibold">Seller Phone:</p>
                      <p className="font-semibold">Other Phone:</p>
                      <p className="font-semibold">Seller Email:</p>
                      <p className="font-semibold">Other Email:</p>
                      <p className="font-semibold">Address:</p>
                      <p className="font-semibold">Note:</p>
                      <p className="font-semibold">Motivation:</p>
                      <p className="font-semibold">Ideal Price:</p>
                    </div>
                    <div>
                      <p>{selectedLead.createdBy}</p>
                      <p>{selectedLead.address}</p>
                      <p>{selectedLead.sellerName}</p>
                      <p>{selectedLead.sellerPhone}</p>
                      <p>{selectedLead.sellerOtherPhone}</p>
                      <p>{selectedLead.sellerEmail}</p>
                      <p>{selectedLead.otherEmail}</p>
                      <p>{selectedLead.address}</p>
                      <p>{selectedLead.note}</p>
                      <p>{selectedLead.motivation}</p>
                      <p>{selectedLead.idealPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 ml-0 mr-0">
                  <GoogleMapContainer />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-black mt-5">
                {/* Conditionally show Comments base on length */}
                {fetchComments && fetchComments.length >= 2 && !allcomments ? (
                  <div className="flex items-center">
                    <FaCommentDots size={24} color="silver" />
                    <button
                      onClick={() => {
                        setAllcomments(!allcomments);
                      }}
                    >
                      Show All yyy{sendNotificationto ? <p>received</p> : ""}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center pr-4">
                    <FaCommentDots size={24} color="silver" />
                    <button
                      onClick={() => {
                        setAllcomments(!allcomments);
                      }}
                    >
                      Show Less Comment
                    </button>
                  </div>
                )}

                {/* I want conditionly loop through the array */}
                {fetchComments
                  ?.sort(
                    (a, b) =>
                      new Date(b.time).getTime() - new Date(a.time).getTime()
                  )
                  ?.slice(0, allcomments ? fetchComments.length : 2)
                  .map((item, index) => (
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

                      {item.comment.split(" ").map((part, partIndex) => {
                        return (
                          <span
                            key={partIndex}
                            className={
                              partIndex === 0
                                ? "font-semibold text-teal-500 "
                                : ""
                            }
                          >
                            {partIndex === 0 ? part : ` ${part}`}
                          </span>
                        );
                      })}
                    </div>
                  ))}
              </div>
              <Activity createdBy={createdBy} mleadId={mleadId}
              />
            </>
          )}
        </div>

        {/* RIGHT SECTION:LEADS:::::::::::::::::::::::::::::::::::::: */}

        <div className="w-1/2 p-4">
        {/* <button type="button" onClick={handleProfileClick}>Check your profile</button>
         */}
        



          <h1 className="text-xl font-semibold mb-4 text-black">
            Leads Created By: {email}...
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
              {lead.length}
            </h2>
          </div>
          {Object.keys(groupedLeads).map((createdBy, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <h2
                  onClick={() => toggleGroup(createdBy)}
                  className="text-xl font-semibold mb-4 cursor-pointer  text-teal-500  "
                >
                  {expandedGroups[createdBy] ? (
                    <div className="flex justify-between">
                      <span>{createdBy} </span>
                      <span className="text-teal-500">
                        <FaMinus />{" "}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between ml-5px">
                      <span>{createdBy}</span>
                      <span className="text-teal-500">
                        {" "}
                        <FaPlus />
                      </span>
                    </div>
                  )}
                </h2>

                <h2 className="text-xl font-semibold mb-4  text-teal-500 ">
                  {groupedLeads[createdBy].length}
                </h2>
              </div>
              {groupedLeads[createdBy].map(
                (leadItem, leadIndex) =>
                  expandedGroups[createdBy] && (
                    <div
                      key={leadIndex}
                      className="cursor-pointer bg-white rounded-lg shadow-md p-6 mb-4 text-black"
                      onClick={() => handleLeadClick(leadItem)}
                    >
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold mb-4">
                          {leadItem.createdBy}
                        </h2>
                        <h2> {leadItem.mleadId}</h2>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
      <div id="map" style={{ height: "400px" }}></div>
    </AdminLayout>
  )}

    </>

  );
};

export default Page;

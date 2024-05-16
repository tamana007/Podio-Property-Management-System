"use client";
import React, { Component, useEffect, useRef, useState } from "react";
import AdminLayout from "@/app/Components/AdminLayout";
import { FiPaperclip, FiMapPin } from "react-icons/fi";
import { FaCommentDots } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus, FaMinus } from 'react-icons/fa';

// import { usePodioStore} from "../podioStore";
import { usePodioStore } from "../podioStore";
import { formatTimeAgo } from "../helpingFunctions/formatTimeAgo";
import { extractBeforeAt } from "../helpingFunctions/extractBeforeAt";
import GoogleMapContainer from "@/app/Components/GoogleMapContainer";
import Activity from "@/app/Components/Activity";

interface DataType {
  createdBy: string;
  leadId: string;
  _id: number;
  mleadId: number;
  // createdBy: string;
  sellerName: string;
  sellerPhone: number;
  sellerOtherPhone: number;
  sellerEmail: string;
  otherEmail: string;
  address: string;
  note: string;
  motivation: string;
  idealPrice: number;
  // [key: string]: any; // Index signature
}

interface DataTypetwo {
  commenter: string;
  time: Date;
  comment: string;
  leadId: number;
}
interface proparr {
  prev: string;
}
//Includ types from tpe..
interface LeadItem extends DataType {
  createdBy: string;
  leadId: string;
}

interface Props {
  email: string;
  lead: LeadItem[];
  handleLeadClick: (leadItem: LeadItem) => void;
}

const Page: React.FC = () => {
  // const podioStore = usePodioStore();
  // const { email } = usePodioStore(); // Access the email from the store

  const podioStore = usePodioStore(); // Use the store
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
  // Define state to store unique names
  const [uniqueNames, setUniqueNames] = useState<string[]>([]);
  const [groupedLeads, setGroupedLeads] = useState<Record<string, LeadItem[]>>(
    {}
  );
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  //Right Section Functions::::::::::::
  const handleLeadClick = (leadItem: DataType) => {
    console.log("lead", mentionedComment);
    console.log("email from store", email);
    setSelectedLead(leadItem);
    // const createdBy = (leadItem as { createdBy: string }).createdBy; // Add this line
    setmLeadId(leadItem.mleadId); // Set mleadId when lead is clicked
    setCommenter(extractBeforeAt(email));
    // podioStore.setEmail(email);
    fetchComment(leadItem.mleadId);
    setAddress(leadItem.address);
    podioStore.setAddress(address);
    // console.log(podioStore, "check addres in podio store");
    // console.log("adress check", address);
    setCreatedBy(leadItem.createdBy);
  };

  //toggle the expansion state
  const toggleGroup = (createdBy: string) => {
    setExpandedGroups((prevExpandedGroups) => ({
      ...prevExpandedGroups,
      [createdBy]: !prevExpandedGroups[createdBy],
    }));
  };

  // Function to combine createdBy items which are similar
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
  // Update groupedLeads when lead prop changes
  React.useEffect(() => {
    setGroupedLeads(combineCreatedByItems(lead));
  }, [lead]);


  //Left Section FUNCTIONS::::::::::::::::::::::::::
  //Store User's Names inside the state
  useEffect(() => {
    //I want to store Unique names using SET
    const uniqueUserName: Set<string> = new Set();
    const users = lead.map((item) => {
      uniqueUserName.add(item.createdBy);
    });
    // Convert the Set back to an array
    const uniqueNamesArray: string[] = Array.from(uniqueUserName);
    setMentionedComment(uniqueNamesArray);
  }, [mleadId]);
  useEffect(() => {}, [selectedLead]);

  const commentFunc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (e.target.value.includes("@")) {
      // Check if "@" is followed by a space or other characters
      const atIndex = e.target.value.indexOf("@");
      const spaceIndex = e.target.value.indexOf(" ", atIndex);
      if (spaceIndex === -1 || spaceIndex === atIndex + 1) {
        // "@" is followed by a space or there are characters immediately after "@"
        setAtClicked(true);
        // console.log("comment includes @", mentionedUser);
      } else {
        // Typing after mentioning a name, hide the dropdown list
        setAtClicked(false);
      }
    } else {
      setAtClicked(false);
    }
  };

  function mentionFunc(user: string) {
    // console.log("user detected", typeof user);
    setFoundUser(user);
    setAtClicked(!atClicked);

    // console.log("founder", foundUser);
  }

  useEffect(() => {
    if (foundUser) {
      setComment(foundUser);
      setAtClicked(false);
      setIsMentioned(true);
    }
  }, [foundUser]);

  // const sendNotification = (part: string) => {
  //   console.log("I found the name new ethod", part);
  // };

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
      // Extract mentioned name from the comment
      console.log("coment extracted", comment);
      console.log(email, "email checkingggg");
      console.log("podio store", podioStore);

      // Split the comment text by spaces
      const commentWords = comment.split(" ");
      // Get the first word
      const firstWord = commentWords[0];

      setNotifyUser(firstWord);
      console.log("notifies user", notifyUser);
    } catch (error) {
      console.log("errerrr", error);
    }
  };

  // Function to send notifications
  // const sendNotifications = () => {
  //   // Implement your notification logic here

  //   if (notifyUser === createdBy) {
  //     console.log(`Sending notification to ${notifyUser}`);
  //     setSentNotificationto(true); // Corrected variable name
  //     console.log("Notification sent");
  //   } else {
  //     console.log("Commenter:", commenter);
  //     console.log("typeof", typeof notifyUser, typeof createdBy);
  //   }
  // };

  

  // useEffect(() => {
  //   // if (notifyUser.length>0) {
  //   sendNotifications();
  //   // }
  // }, [notifyUser]);
  // useEffect(() => {
  //   console.log("mentioned name", mentionedName);
  // }, [mentionedName]);

  // useEffect(() => {
  //   if (mentionedName) {
  //     sendNotification(mentionedName);
  //   }
  // }, [mentionedName]);

  const handleShareLocation = () => {
    const googleMapsUrl = "https://www.google.com/maps";
    const googleMapsTab = window.open(googleMapsUrl, "_blank");

    const urlChangeListener = (event: MessageEvent) => {
      if (event.origin === "https://www.google.com") {
        console.log("URL EVENT LISTENED");

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

  const mentionedClass = isMentioned ? "bold-text" : "";

  return (
    <AdminLayout>
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
                    />
                    <FiMapPin
                      className="text-teal-600 cursor-pointer hover:text-gray-900 ml-2"
                      size={24}
                      // onClick={handleShareLocation}
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
                        {/* <p className="mr-20">{item.commenter}</p> */}
                        <p className="mr-20">{email}</p>

                        <p>
                          {formatTimeAgo(new Date(item.time).toLocaleString())}
                        </p>
                      </div>
                      {/* Split the comment text by "@" symbol */}

                      {item.comment.split(" ").map((part, partIndex) => {
                        // sendNotification(part); // Call sendNotification here
                        return (
                          <span
                            key={partIndex}
                            className={
                              partIndex === 0
                                ? "font-semibold text-teal-500 "
                                : ""
                            }
                          >
                            {/* Render the first part as bold */}
                            {partIndex === 0 ? part : ` ${part}`}
                          </span>
                        );
                      })}
                    </div>
                  ))}
              </div>
              {/* <Activity createdBy={createdBy} mleadId={mleadId}/>
               */}
              <Activity createdBy={createdBy} mleadId={mleadId} />
            </>
          )}
        </div>

        {/* RIGHT SECTION:LEADS:::::::::::::::::::::::::::::::::::::: */}

        <div className="w-1/2 p-4">
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
              600
            </h2>
          </div>
          {Object.keys(groupedLeads).map((createdBy, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <h2
                  onClick={() => toggleGroup(createdBy)}
                  className="text-xl font-semibold mb-4 cursor-pointer  text-teal-500  "
                >
                  {expandedGroups[createdBy] ? <div className="flex justify-between"><span>{createdBy} </span><span className="text-teal-500">  <FaMinus/>   </span></div> : <div className="flex justify-between ml-5px"><span>{createdBy}</span><span className="text-teal-500"> <FaPlus/></span></div>}
                  
                </h2>
                {/* {} */}
                <h2 className="text-xl font-semibold mb-4  text-teal-500 ">
                  LeadId
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
  );
};

export default Page;

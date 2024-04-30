import React, {
  FormEvent,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import Status from "@/app/Components/Status";

interface ActivityProps {
  createdBy: string;
}
interface ActionForm {
  leadAssignment: string;
  disposition: string;
  createdBy: string;
  region: string;
  stageOfLead: string;
}
const initialData: ActionForm = {
  leadAssignment: "",
  disposition: "",
  createdBy: "",
  region: "",
  stageOfLead: "",
};
interface Response {
  leadId: number;
  leadAssignment: string;
  disposition: string;
  createdBy: string;
  region: string;
  stageOfLead: string;
  _id: string;
  __v: string;
}
const updateResponseval = {
  leadId: 0, // or whatever initial value you want for leadId
  leadAssignment: "",
  disposition: "",
  createdBy: undefined, // or "" if it's a string
  region: "",
  stageOfLead: "",
  _id: "",
  __v: "",
};


// const Activity = (createdBy: ActivityProps, mleadId: mleadIdProps) => {
  const Activity = ({ createdBy, mleadId }: { createdBy: string; mleadId: number | null }) => {
  const [leadAssignment, setLeadAssignment] = useState<string>("");
  const [disposition, setDisposition] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [stageOfLead, setStageOfLead] = useState<string[]>([
    "Contacted",
    "ContractSent",
    "UnderContract",
    "AssignmentSent",
    "AssignmentReceived",
  ]);
  //Clicked is for stage of lead the one which gets clicked::::::::::::::
  const [clicked, setClicked] = useState<{ name: string } | null>(null);
  const [sendReq, setSendReq] = useState<boolean>(false);
  const [response, setResponse] = useState({
    leadId: Number,
    leadAssignment: String,
    disposition: String,
    createdBy: undefined,
    region: String,
    stageOfLead: String,
    _id: String,
    __v: String,
  });
  const [showStatus, setShowStatus] = useState<boolean>(true);
  const [updateResponse, setUpdateResponse]=useState(updateResponseval)

  //Functions
  function changeRegion(regionparam: string) {
    setRegion(regionparam);
    // console.log("region name,", region);
  }
  function formFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleDisposition(e: React.MouseEvent<HTMLButtonElement>) {
    const { name } = e.currentTarget;
    setDisposition(name);
  }
  //stage of lead
  const handleButtonClick = (stage: string) => {
    setClicked((prevClicked) => ({
      ...prevClicked,
      name: stage,
    }));
    console.log("stage", stage);
    console.log("cliced", clicked);
  };

  //API CALL...........................

  const saveActivity = async () => {
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        body: JSON.stringify({
          leadAssignment,
          disposition,
          createdBy,
          region,
          clicked,
          mleadId,
        }),
      });
      if (res.ok) {
        setSendReq(true);
        const responsed = await res.json();
        console.log("sent Successfully", responsed.newAction);
        setResponse(responsed.newAction);
        // console.log('send request result',sendReq);
        // console.log('responseee',response);

      localStorage.setItem("activityStatus", JSON.stringify(response));
      // console.log('local storage data detected',updateResponse);
      

      }
    } catch (error) {
      console.log("error happened", error);
    }
  };



  // Load status from localStorage on component mount

  useEffect(() => {
    const savedStatus = localStorage.getItem("activityStatus");
    if(savedStatus !==null){
      console.log("from loal storage", savedStatus);
      setUpdateResponse(JSON.parse(savedStatus));
    // console.log('not update finally',updateResponse);
    }
    // console.log('update finally',updateResponse);

  }, [response]);



  useEffect(() => {
    console.log('mleadId',mleadId);
    
    // console.log("disposition real data", disposition);
    // saveActivity();
  }, []);

  // Check if leadId matches mleadId
const leadIdMatches = updateResponse.leadId === mleadId;

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100 text-black">
        Actions:{mleadId}
      </h2>
      <form
        onSubmit={(e) => {
          formFunc(e);
        }}
      >
        <div className="grid grid-cols-1 gap-4 px-4 py-2">
          <div>
            <div className="flex justify-between text-black">
              <p className="font-semibold">Lead Assignment: {mleadId}</p>
              <input
                value={leadAssignment}
                type="text"
                className="border border-gray-300 rounded px-3 py-1"
                onChange={(e) => {
                  setLeadAssignment(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            {/*:::::::::::: DISPOSITION::::::::::::::::::: */}

            <div className="flex justify-between">
              <p className="font-semibold text-black">Disposition:</p>
              <div>
                <button
                  disabled={sendReq}
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    disposition === "True" ? "bg-teal-500" : ""
                  }`}
                  name="True"
                  onClick={(e) => {
                    handleDisposition(e);
                  }}
                >
                  True
                </button>
                <button
                  disabled={sendReq}
                  name="False"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    disposition === "False" ? "bg-teal-500" : ""
                  }`}
                  onClick={(e) => {
                    handleDisposition(e);
                  }}
                >
                  False
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="font-semibold text-black">Lead Created By:</p>
              <div className="text-black">
                <p>{createdBy}</p>
              </div>
            </div>
          </div>
          <div>
            {/* :::::::::::::::::::REGION::::::::::::::::::::::::::::::::::::::::::::::::::::::: */}

            <div className="flex justify-between">
              <p className="font-semibold text-black">Region:</p>
              <div>
                <button
                  disabled={sendReq}
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    region === "DFW" ? "bg-teal-500" : ""
                  }`}
                  onClick={() => {
                    changeRegion("DFW");
                  }}
                >
                  DFW
                </button>
                <button
                  disabled={sendReq}
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    region === "FL" ? "bg-teal-500" : ""
                  }`}
                  onClick={() => {
                    changeRegion("FL");
                  }}
                >
                  FL
                </button>
                <button
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    region === "Houseton" ? "bg-teal-500" : ""
                  }`}
                  onClick={() => {
                    changeRegion("Houseton");
                  }}
                >
                  Houseton
                </button>
              </div>
            </div>
          </div>
          {/* :::::::::::::::::::::::::::::::::::STAGE OF LEAD::::::::::::::::::::::::::::::::::::::::::::::::: */}
          {/* Loop through stages, creating a button for each one. When a button is clicked, store its stage in a state and add a class to the button if it matches the stored stage */}
          <div>
            <div className="flex flex-col ">
              <p className="font-semibold text-black mb-8 ">Stage of Lead:</p>
              <div className="flex flex-wrap">
                {stageOfLead.map((stage) => (
                  <button
                    disabled={sendReq}
                    key={stage}
                    onClick={() => {
                      handleButtonClick(stage);
                    }}
                    type="submit"
                    className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${
                      clicked && clicked.name === stage ? "bg-teal-500" : ""
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-teal-600  text-white px-2 py-1 rounded mr-11 ml-11 mb-2 mt-3 w-40 "
                  onClick={saveActivity}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* // Check if leadId matches mleadId */}

      {showStatus && (
        <div className="bg-gray-200  border border-gray-300 rounded-lg overflow-hidden text-black mt-10">
          <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100 text-black">
            Status:{mleadId}
          </h2>
   
{leadIdMatches&&

Object.entries(updateResponse).map(([key, value]) => {
  if (key !== "_id" && key !== "__v" && key !== "leadId") {
    return (
      <div key={key} className="mb-4 flex justify-between">
        <p className="font-semibold ml-3">{key}:</p>
        <p className="mr-10">{value}</p>
      </div>
    );
  } else if (key === "leadId" && typeof value === "number" && value === mleadId) {
    return (
      <div key={key} className="mb-4 flex justify-between">
        <p className="font-semibold ml-3">{key}:</p>
        <p className="mr-10">{value}</p>
      </div>
    );
  }
  return null;
})}

        </div>
      )}
    </div>
  );
};

export default Activity;

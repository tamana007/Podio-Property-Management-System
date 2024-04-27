import React, {
  FormEvent,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

interface ActivityProps {
  createdBy: string;
}
interface mleadIdProps {
  mleadId: number;
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

const Activity = (createdBy: ActivityProps, mleadId: mleadIdProps) => {
  // const [actionForm, setActionForm] = useState<ActionForm>(initialData);
  const [leadAssignment, setLeadAssignment] = useState<string>("");
  const [disposition, setDisposition] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [stageOfLead, setStageOfLead] = useState<string>("");
  const [status,setStatus]=useState<string>("")


  function changeRegion(regionparam: string) {
    setRegion(regionparam);
    console.log("region name,", region);
  }
  function formFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log('form function logged');
  }
  function handleDisposition(e:React.MouseEvent<HTMLButtonElement>){
    const {name}=e.currentTarget;
    setDisposition(name)

  }
  function handleStatus(e:React.MouseEvent<HTMLButtonElement>){
    const{name,value}=e.currentTarget;
    setStatus(name);
    console.log('status logged',status);

    
  }
  useEffect(()=>{
    const saveActivity=async()=>{
      try {
        const res=await fetch('/api/activity',{
          method:'POST',
          body:JSON.stringify({leadAssignment,disposition,createdBy,region,status})
  
        })
        if(res.ok){
          console.log('sent Successfully');
          
        }
        
      } catch (error) {
        console.log('error happened',error);
        
        
      }
      

    }
    saveActivity()

  },[
    handleStatus
  ])

  useEffect(() => {
    console.log("disposition real data", disposition);
    // console.log("action from from useefcet", actionForm);
  }, [disposition, 'disposition got']);

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100 text-black">
        Actions:
      </h2>
      <form
        onSubmit={(e) => {
          formFunc(e);
        }}
      >
        <div className="grid grid-cols-1 gap-4 px-4 py-2">
          <div>
            <div className="flex justify-between text-black">
              <p className="font-semibold">Lead Assignment:</p>
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
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    disposition==='True' ? "bg-green-600" : ""
                  }`}
                  name="True"
                  onClick={(e) => {
                    handleDisposition(e)

                  }}
                >
                  True
                </button>
                <button
                name="False"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    disposition==='False' ? "bg-green-600" : ""
                  }`}
                  onClick={(e) => {
                  handleDisposition(e)
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
                <p>{createdBy.createdBy}</p>
              </div>
            </div>
          </div>
          <div>
            {/* :::::::::::::::::::REGION::::::::::::::::::::::::::::::::::::::::::::::::::::::: */}

            <div className="flex justify-between">
              <p className="font-semibold text-black">Region:</p>
              <div>
                <button
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    region === "DFW" ? "bg-green-600" : ""
                  }`}
                  onClick={() => {
                    changeRegion("DFW");
                  }}
                >
                  DFW
                </button>
                <button
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    region === "FL" ? "bg-green-600" : ""
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
                    region === "Houseton" ? "bg-green-600" : ""
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
          {/* ::::::::::::::::::::::::::::::STAGE OF LEAD:::::::::::::::::::::::::::: */}
          <div>
            <div className="flex flex-col ">
              <p className="font-semibold text-black mb-8 ">Stage of Lead:</p>
              <div className="flex flex-wrap">
                <button
                onClick={(e)=>{handleStatus(e)}}
                  name="Contracted"
                  value={"Contracted"}
                  type="submit"
                  className={` bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${
                    status === "Contracted" ? "bg-green-600" : ""
                  }`}
                >
                  Contacted
                </button>
                <button
                onClick={(e)=>{handleStatus(e)}}
                  name="ContractSent"
                  value={"Contact Sent"}
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${
                    status === "ContractSent" ? "bg-green-600" : ""
                  }`}
                >
                  Contract Sent
                </button>
                <button
                 onClick={(e)=>{handleStatus(e)}}
                  name="UnderContract"
                  value={" Under Contract"}
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${
                    status === "UnderContract" ? "bg-green-600" : ""
                  }`}
                >
                  Under Contract
                </button>
                <button
                onClick={(e)=>{handleStatus(e)}}
                  name="AssignmentSent"
                  value={"Assignment Sent"}
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${
                    status === "AssignmentSent" ? "bg-green-600" : ""
                  }`}
                >
                  Assignment Sent
                </button>
                <button
                onClick={(e)=>{handleStatus(e)}}
                  type="submit"
                  name="AssignmentReceived"
                  value={"Assignment Received"}
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${
                    status === "AssignmentReceived" ? "bg-green-600" : ""
                  }`}
                >
                  Assignment received
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Activity;

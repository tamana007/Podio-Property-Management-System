import React, {
  FormEvent,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

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

const Activity = (createdBy: ActivityProps) => {
  const [actionForm, setActionForm] = useState<ActionForm>(initialData);
  const [leadAssignment, setLeadAssignment] = useState<string>("");
  const [disposition, setDisposition] = useState<string>("");
  const [selectDisposition, setSelectDisposition] = useState<boolean>(false);
  const [selectDisposition2, setSelectDisposition2] = useState<boolean>(false);
  const [region, setRegion] = useState<string>("");
  const [stageOfLead,setStageOfLead]=useState<string>("");
  //  const[stageOfLead,set]

  function changeRegion(regionparam: string) {
    setRegion(regionparam);
    console.log("region name,", region);
  }
  function formFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setActionForm((prev) => ({ ...prev, [name]: value }));
    console.log('form function consoled',actionForm,'naem');
    
  }

  useEffect(() => {
    console.log("disposition real data", disposition);
    console.log('action from from useefcet',actionForm);
    
  }, [disposition,actionForm]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100 text-black">
        Actions:
      </h2>
      <form
        onSubmit={(e) => {
      // here I get the error for e 

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
                  // setActionForm((prev)=>(...actionForm,e.target.value))
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
                    selectDisposition ? "bg-green-600" : ""
                  }`}
                  name="True"
                  onClick={(e) => {
                    setDisposition(e.currentTarget.name);
                    setSelectDisposition(!selectDisposition);
                    setSelectDisposition2(false);
                  }}
                >
                  True
                </button>
                <button
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 ${
                    selectDisposition2 ? "bg-green-600" : ""
                  }`}
                  name="False"
                  onClick={(e) => {
                    setDisposition(e.currentTarget.name);
                    setSelectDisposition(false);
                    setSelectDisposition2(!selectDisposition2);
                    console.log(disposition, "from false state");
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
                onClick={()=>{setStageOfLead('Contracted')}}
                  name="stageOfLead"
                  value={"Contracted"}
                  type="submit"
                  className={` bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${stageOfLead==='Contracted' ? "bg-green-600" : ""}`}
                >
                  Contacted
                </button>
                <button
                onClick={()=>{setStageOfLead('ContractSent')}}
                  name="stageOfLead"
                  value={"Contact Sent"}
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${stageOfLead==='ContractSent' ? "bg-green-600" : ""}`}
                >
                  Contract Sent
                </button>
                <button
                onClick={()=>{setStageOfLead('UnderContract')}}
                  name="stageOfLead"
                  value={" Under Contract"}
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${stageOfLead==='UnderContract' ? "bg-green-600" : ""}`}
                >
                  Under Contract
                </button>
                <button
                onClick={()=>{setStageOfLead('AssignmentSent')}}
                  name="stageOfLead"
                  value={"Assignment Sent"}
                  type="submit"
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${stageOfLead==='AssignmentSent' ? "bg-green-600" : ""}`}
                >
                  Assignment Sent
                </button>
                <button
                onClick={()=>{
                  setStageOfLead('AssignmentReceived')
                }}
                  type="submit"
                  name="stageOfLead"
                  value={"Assignment Received"}
                  className={`bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2 ${stageOfLead==='AssignmentReceived' ? "bg-green-600" : ""}`}
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

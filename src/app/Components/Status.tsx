import React from 'react';

interface Response {
  leadId: number;
  leadAssignment: string;
  disposition: string;
  createdBy: undefined;
  region: string;
  stageOfLead: string;
  _id: string;
  __v: string;
}

interface mleadIdProps {
  mleadId: number;
}

const Status: React.FC<{ response: Response ,mleadId:mleadIdProps}> = ({ response, mleadId }) => {
  return (
    <div className="bg-gray-200  border border-gray-300 rounded-lg overflow-hidden text-black mt-10">
      <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100 text-black">
        Status:{mleadId.mleadId}
      </h2>
      {Object.entries(response).map(([key, value]) => {
        if (key !== '_id' && key !== '__v' && key==='mleadId'&& value===mleadId.mleadId) {
          return (
            <div key={key} className="mb-4 flex justify-between">
              <p className="font-semibold ml-3  ">{key}:</p>
              <p className='mr-10'>{value}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Status;

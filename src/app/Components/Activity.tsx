import React from 'react';

const Activity = ({ leadAssignment, disposition, stageOfLead }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100 text-black">
        Actions:
      </h2>

      <div className="grid grid-cols-1 gap-4 px-4 py-2">
        <div>
          <div className="flex justify-between">
            <p className="font-semibold text-black">Lead Assignment:</p>
            {/* <p>{leadAssignment}goes here</p> */}
            <input  type="text" className="border border-gray-300 rounded px-3 py-1" />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="font-semibold text-black">Disposition:</p>
            <div>
              <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2">True</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded">False</button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="font-semibold text-black">Lead Created By:</p>
            <div>
              <p className="bg-gray-500">Arash</p>
              {/* <button className="bg-gray-500 text-white px-3 py-1 rounded">False</button> */}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="font-semibold text-black">Region:</p>
            <div>
              <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2">DFW</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2">FL</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2">Houseton</button>

            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="font-semibold text-black">Stage of Lead:</p>
            <div className="flex flex-wrap">
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">New Untouched</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Contacted</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Offer Sent</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Contract Sent</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Under Contract</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Assignment Sent</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Assigned</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Buying Ouselves</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Followup</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Future Follow up</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Cancelled</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Dead</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Sold</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">Memorandum Filed</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2 mb-2">DO NOT GET UNDER CONTRACT AGAIN</button>

              {/* Add more buttons for other stages */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;

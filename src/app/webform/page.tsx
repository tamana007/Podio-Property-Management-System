// pages/webform.tsx

import React from 'react';

const WebForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl p-6 bg-gray-100 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">EXTREME REIS LEADS</h1>

        {/* Input for seller's information */}
        <div className="mb-4">
          <label htmlFor="sellerInfo" className="block mb-1 text-black">Seller's Information</label>
          <input type="text" id="sellerInfo" className="w-full px-3 py-2 border rounded-md" placeholder="Enter seller's phone number, email, or other" />
        </div>

        {/* Input for property address */}
        <div className="mb-4">
          <label htmlFor="propertyAddress" className="block mb-1 text-black">Property Address</label>
          <input type="text" id="propertyAddress" className="w-full px-3 py-2 border rounded-md" placeholder="Enter property address" />
        </div>

        {/* Note section */}
        <div className="mb-4">
          <label htmlFor="note" className="block mb-1 text-black">Note</label>
          <textarea id="note" className="w-full px-3 py-2 border rounded-md" rows={4} placeholder="Enter note here"></textarea>
        </div>

        {/* Motivation and ideal price */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="motivation" className="block mb-1 text-black">Motivation</label>
            <input type="text" id="motivation" className="w-full px-3 py-2 border rounded-md" placeholder="Enter seller's motivation" />
          </div>
          <div>
            <label htmlFor="idealPrice" className="block mb-1 text-black">Seller's Ideal Price</label>
            <input type="text" id="idealPrice" className="w-full px-3 py-2 border rounded-md" placeholder="Enter seller's ideal price" />
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default WebForm;

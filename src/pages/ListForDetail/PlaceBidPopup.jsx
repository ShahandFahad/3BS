import React, { useState } from "react";
import { publicRequest } from "../../requestMethods";

export default function PlaceBidPopup({
  setShowPlaceBidPopup,
  bidderId,
  bidderName,
  productId,
}) {
  const [bidPrice, setBidPrice] = useState("");

  // Get user password
  const handleBidPriceChange = (e) => {
    setBidPrice(e.target.value);
  };

  /**
   *
   * Place a bid for the product
   *
   */

  const handlePlaceBid = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    if (bidPrice) {
      const placeBidOnProduct = async () => {
        try {
          const bidResponse = await publicRequest.patch(
            `product/sell/add/${productId}`,
            { bidderId, bidderName, bidPrice }
          );

          console.log(bidResponse);
          setShowPlaceBidPopup(false);
        } catch (error) {
          console.log(error);
        }
      };

      //   Function Call
      placeBidOnProduct();

      window.location.reload();
    }
  };
  return (
    <div className="flex justify-center h-full items-center space-x-4 bg-gray-100 backdrop-blur-sm bg-white/10">
      {/* BID INPUT */}

      <div className="flex flex-col bg-white p-10 rounded-md shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl bold">Place Your Bid</h2>
          {/* Cancel box */}
          <button
            onClick={() => setShowPlaceBidPopup(false)}
            className="flex justify-end cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 relative focus-within:text-gray-600 text-gray-400">
          <input
            type="number"
            className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            placeholder="10"
            min={1}
            onChange={handleBidPriceChange}
          />
          <div className="absolute left-3 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          {/* Place Bid Button */}
          <button
            onClick={handlePlaceBid}
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>

            <span>Place</span>
          </button>
        </div>
      </div>
    </div>
  );
}

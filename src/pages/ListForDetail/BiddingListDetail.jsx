import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar2";

import { publicRequest, userRequest } from "../../requestMethods";
import * as timeago from "timeago.js";
// import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CHAT, SELECTED } from "../../redux/User/userTypes";
import PlaceBidPopup from "./PlaceBidPopup";

/**
 *
 * Notifier for, when bidding time ends, then max bidder and product owner recieve a notification
 * Also set close auction to true and auction winner, be sending request to server
 *
 * @param {*} productOwner
 * @param {*} biddingWinner
 */
const notifyOnBiddingTimeEnds = async (
  productDetail,
  productOwner,
  isAuctionClosed,
  biddingWinner
) => {
  console.log("Notification Function");

  // Product Owner
  await publicRequest.post(`/notifications`, {
    userId: productOwner._id,
    notifyBy: productOwner.fullName,
    text: `Dear ${productOwner.fullName}, your product bidding time has ended. And ${biddingWinner.bidderName} Has won the bidding. Please Contact Him. Thanks `,
  });

  // Bid Winner
  await publicRequest.post(`/notifications`, {
    userId: biddingWinner.bidderId,
    notifyBy: biddingWinner.bidderName,
    text: `Dear ${biddingWinner.bidderName}, you have won the bidding. on product placed by (${productOwner.fullName}). Contact him and pay the dues. Thanks`,
  });

  const bidResponse = await publicRequest.put(
    `product/sell/add/${productDetail._id}`,
    { auctionClosed: isAuctionClosed, auctionWinner: biddingWinner }
  );

  console.log("BID RESPONSE: ", bidResponse);
  console.log(productOwner, biddingWinner);
  console.log("Notification End");
};

//
//
// Component
//
//
export default function BiddingListDetail() {
  const { productId } = useParams();

  const [details, setDetails] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [productOwnerDetail, setProductOwnerDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const [productImages, setProductImages] = useState([]);
  const [newPhoto, setNewPhoto] = useState(productImages[0]);

  // current conversations
  const [currentConversations, setCurrentConversations] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPlaceBidPopup, setShowPlaceBidPopup] = useState(false);

  // For bid count down
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [isAuctionClosed, setAuctionClosed] = useState(false);
  const [auctionWinner, setAuctionWinner] = useState("");

  // fetch product Details
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetched = await publicRequest.get(
        `/product/sell/details/${productId}`
      );
      setDetails(fetched.data);
      setProductDetail(fetched.data.details);
      setProductOwnerDetail(fetched.data.By);
      setProductImages(fetched.data.details.photos);
      setNewPhoto(fetched.data.details.photos[0]);
      setLoading(false);
    };
    fetchData();
  }, [productId]);
  // console.log(details, productDetail, productOwnerDetail);
  // time format
  let sinceJoin = new Date(productOwnerDetail.createdAt).toLocaleString(
    "en-US",
    {
      day: "numeric",
      year: "numeric",
      month: "long",
    }
  );

  // Enable Chat

  // fetch current conversations
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const chats = await userRequest.get(`/conversation/find/${user._id}`);
      setCurrentConversations(chats.data);
    };
    fetchData();
  }, [user]);

  const handleChat = async () => {
    // console.log(details.By._id);
    // console.log(currentConversations);
    const found = currentConversations?.map((m) =>
      m.members.find((f) => {
        return f === productOwnerDetail._id;
      })
    );

    try {
      const final = found.filter((f) => f === productOwnerDetail._id);
      if (final.length > 0) {
        dispatch({ type: SELECTED, selected: null }) &&
          dispatch({ type: CURRENT_CHAT, currentChat: null });
        navigate("/chatbox");
      } else {
        const newChat = await userRequest.post(`/conversation`, {
          senderId: user._id,
          recieverId: productOwnerDetail._id,
        });
        newChat &&
          dispatch({ type: SELECTED, selected: productOwnerDetail }) &&
          dispatch({ type: CURRENT_CHAT, currentChat: newChat._id }) &&
          navigate("/chatbox");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // This effect runs a counter for auction duration
  useEffect(() => {
    const MILLI_SECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    const MILLI_SECONDS_IN_AN_HOUR = 60 * 60 * 1000;
    const MILLI_SECONDS_IN_A_MINUTE = 60 * 1000;
    const MILLI_SECONDS_IN_A_SECOND = 1000;

    // Check if Time is remaining or not. To start the counter
    // if (Date.now() < new Date(productDetail?.auctionDuration).getTime()) {
    if (!productDetail.auctionClosed) {
      const interval = setInterval(() => {
        // Get time between, current time and deadline time on which bidding ends
        let remainingTime =
          new Date(productDetail?.auctionDuration).getTime() -
          new Date().getTime();
        // Calcute days, hours, minutes, seconds
        let days_ = Math.floor(remainingTime / MILLI_SECONDS_IN_A_DAY);
        setDays(days_);
        let hours_ = Math.floor(
          (remainingTime % MILLI_SECONDS_IN_A_DAY) / MILLI_SECONDS_IN_AN_HOUR
        );
        setHours(hours_);
        let minutes_ = Math.floor(
          (remainingTime % MILLI_SECONDS_IN_AN_HOUR) / MILLI_SECONDS_IN_A_MINUTE
        );
        setMinutes(minutes_);
        let seconds_ = Math.floor(
          (remainingTime % MILLI_SECONDS_IN_A_MINUTE) /
            MILLI_SECONDS_IN_A_SECOND
        );
        setSeconds(seconds_);
        console.log(
          `EF: D ${days} :: H ${hours} :: M ${minutes} :: S ${seconds}`
        );

        // When count down is finished
        if (remainingTime < 0) {
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          console.log("Bidding Time Ended (Interval)");

          // Ge the highest user bid id

          // TODO: Reduce this logic to simple js one liner
          let max = 0;
          let bidder = {};
          productDetail.bids.map((bid) => {
            if (bid.bidPrice > max) {
              max = bid.bidPrice;
              bidder = bid;
            }
          });

          // Set auction to false
          setAuctionClosed(true);
          // Set Auction Winner
          setAuctionWinner(bidder);
          // Notify user
          // notifyOnBiddingTimeEnds(productDetail, productOwnerDetail, bidder);

          // After notification, navigate back to bidding page
          // navigate("/biddedproducts", { replace: true });
        }
      }, 1000);

      // Close Interval
      return () => clearInterval(interval);
    }
  }, [productDetail]);

  //
  //
  //

  // TODO: This is temprory notification, Update to only send 1 notification to each and rempve the complex and spaghetti code
  const check = () => {
    // When Auction closed Notify
    if (isAuctionClosed) {
      console.log("AUCTION IS Closed");
      notifyOnBiddingTimeEnds(
        productDetail,
        productOwnerDetail,
        isAuctionClosed,
        auctionWinner
      );

      // window.location.reload();
      // Navigate to bidding page to avoid multiple notification
      navigate("/biddedproducts", { replace: true });
    } else {
      // console.log("AUCTION IS ON");
    }
  };
  check();
  return (
    <>
      <div class="antialiased relative">
        <Navbar />
        {!loading ? (
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                  <div>
                    <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                      <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                        <span class="text-5xl">
                          <img className="h-64" src={newPhoto} alt="" />
                        </span>
                      </div>
                    </div>

                    {/* Small Image Boxes: Iterate over and display only 4 */}
                    <div class="flex -mx-2 mb-4">
                      {!loading
                        ? productImages.map((productImage, index) =>
                            index < 4 ? (
                              <section x-for="i in 4">
                                <div class="flex-1 px-2">
                                  <button
                                    onClick={() => setNewPhoto(productImage)}
                                    class="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"
                                  >
                                    <span class="text-2xl">
                                      <img
                                        className="h-24"
                                        src={productImage}
                                        alt=""
                                      />
                                    </span>
                                  </button>
                                </div>
                              </section>
                            ) : (
                              <></>
                            )
                          )
                        : "loading"}
                    </div>
                  </div>
                </div>
                <div class="md:flex-1 px-4">
                  <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                    {productDetail.title}
                  </h2>
                  <p class="text-gray-500 text-sm">
                    By{" "}
                    <Link
                      to={`/profile/${productOwnerDetail._id}`}
                      class="text-indigo-600 hover:underline"
                    >
                      {productOwnerDetail.fullName}
                    </Link>
                  </p>

                  <div class="flex items-center space-x-4 my-4">
                    <div>
                      <div className="p-4 rounded-lg bg-gray-100 flex gap-4 item-center flex-wrap">
                        <div>
                          <span class="font-bold  text-xl text-indigo-600 mr-1 mt-1">
                            Starting bid:
                          </span>
                          <span class="font-bold text-2xl">
                            {productDetail.auctionStartingBid}
                          </span>
                        </div>
                        <div>
                          {/* <span class="font-bold text-xl text-indigo-600 mr-1 mt-1">
                            Quantity:
                          </span>
                          <span class="font-bold text-2xl">
                            {productDetail.auctionQuantity}{" "}
                          </span> */}
                        </div>
                      </div>
                      {/* Check if auction ended or not */}
                      {!productDetail.auctionClosed ? (
                        <div className="bg-gray-50 mt-4 mb-4 p-4">
                          <p class="text-red-500 text-xl font-semibold">
                            Ends in
                          </p>
                          <p class="text-gray-600 text-lg">
                            {`${days}d ${hours}h ${minutes}m ${seconds}s`}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gray-50 mt-4 mb-4 p-4">
                          <p className="text-red-500 tex-xl font-bold">
                            Auction Ended
                          </p>
                          <h1>
                            {" "}
                            Auction Winner{" "}
                            {productDetail?.auctionWinner.bidderName}, Auction
                            Price {productDetail?.auctionWinner.bidPrice}
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>

                  <p class="text-gray-500">{productDetail.description}</p>

                  {/* Hide chat and place bid, button fro product owner */}
                  {JSON.parse(localStorage.getItem("user"))._id ===
                  productOwnerDetail._id ? (
                    <div className="text-blue-600 text-lg">Your Product</div>
                  ) : (
                    <div class="flex py-4 space-x-4">
                      {/* Hide Place Bid Button when auction ended */}
                      {!productDetail.auctionClosed ? (
                        <button
                          onClick={() => setShowPlaceBidPopup(true)}
                          type="button"
                          class="h-14 px-6 py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          Place Bid
                        </button>
                      ) : (
                        <></>
                      )}
                      <button
                        onClick={handleChat}
                        type="button"
                        class="h-14 px-6 py-2 font-semibold rounded-xl bg-green-600 hover:bg-green-500 text-white"
                      >
                        Chat Now
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* List of TableShow Bidding */}
              <div className="relative overflow-x-auto">
                <h1 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                  LIST of Placed Bids
                </h1>
                <table className="w-full text-left ">
                  <thead className="border">
                    <tr>
                      <th className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-xl text-left px-6 py-3">
                        Bidder Name
                      </th>
                      <th className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-xl text-left px-6 py-3">
                        Bidding Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border">
                    {productDetail.bids && productDetail.bids.length > 0 ? (
                      productDetail.bids.map((bid) => (
                        <tr>
                          <td className="border px-6 py-3">
                            By{" "}
                            <Link
                              to={`/profile/${bid.bidderId}`}
                              class="text-indigo-600 hover:underline"
                            >
                              {bid.bidderName}
                            </Link>
                          </td>
                          <td className="border px-6 py-3">{bid.bidPrice}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>No, Bids Are Placed Now. Be First to Place one</tr>
                    )}
                  </tbody>
                </table>

                {/*  */}
              </div>
            </div>

            {/*Place Bid by sending current user id from local storage & product id*/}
            {showPlaceBidPopup && (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <PlaceBidPopup
                  setShowPlaceBidPopup={setShowPlaceBidPopup}
                  bidderId={JSON.parse(localStorage.getItem("user"))._id}
                  bidderName={JSON.parse(localStorage.getItem("user")).fullName}
                  productId={productDetail._id}
                />
              </div>
            )}
          </div>
        ) : (
          <>loading</>
        )}
      </div>
    </>
  );
}

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import Navbar from "../../components/Navbar/Navbar2";
import PublicBiddedProducts from "../../components/BiddingProducts/PublicBiddedProducts";

export default function Bidding() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getPublicProductsListedForBidding = async () => {
      try {
        // Fetch Products listed for rent
        const response = await publicRequest.get(
          `/product/product-listed-for/all/${user._id}/${"Bidding"}`
        );

        console.log(response);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getPublicProductsListedForBidding();
  }, []);
  return (
    <div>
      <Navbar />
      <PublicBiddedProducts mode="biddedProducts" />
    </div>
  );
}

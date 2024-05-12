import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { loader } from "../../loader";
import PublicBiddedProductsRow from "./PublicBiddedProductsRow";

export default function PublicBiddedProducts({ mode }) {
  const user = useSelector((state) => state.user);
  const [publicBiddedProducts, setPublicBiddedProducts] = useState([]);
  const [currentUserBiddedProducts, setCurrentUserBiddedProducts] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const fechedProducts = await publicRequest.get(
          `/product/sell/all/${user._id}`
        );
        setCurrentUserBiddedProducts(fechedProducts.data.allProducts);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    setLoading(true);

    const getPublicProductsListedForBidding = async () => {
      try {
        // Fetch Products listed for Bidding
        const response = await publicRequest.get(
          `/product/product-listed-for/all/${user._id}/${"Bidding"}`
        );

        console.log(response);
        setPublicBiddedProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getPublicProductsListedForBidding();
  }, []);
  return (
    <>
      <>
        <div style={{ height: "100vh" }} class="overflow-x-auto shadow-md">
          {/* Display Public Products availabel for rent */}
          <h1 className="text-2xl p-4">Product Available For Bidding</h1>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">Image</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>

                <th scope="col" class="px-6 py-3">
                  Price (PKr)
                </th>
                <th scope="col" class="px-6 py-3">
                  No. of Bids
                </th>
                <th scope="col" class="px-6 py-3">
                  Condition
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Place Bid
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Iterate over list of products and filter out products which are listed as rent */}
              {/* Set Current user false, as this component display public proudcts for bidding */}
              {!loading && mode === "biddedProducts" ? (
                publicBiddedProducts.map((product) =>
                  product.listFor === "Bidding" ? (
                    <PublicBiddedProductsRow product={product} />
                  ) : (
                    <></>
                  )
                )
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "100px",
                  }}
                >
                  <img src={loader} width={30} alt="eximg" />
                </div>
              )}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { loader } from "../../loader";
import BuyerRequestProductRow from "./BuyerRequestProductRow";

/**
 * THIS DISPLAYS ALL THE BUYER REQUEST PRODUCT FOR CURRENT USER
 */

function CurrentUserBuyerRequest({ mode }) {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  // loading
  const [loading, setLoading] = useState(false);
  // fetch all product of current user
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const fechedProducts = await publicRequest.get(
          `/product/sell/all/${user._id}`
        );
        setProducts(fechedProducts.data.allProducts);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <div style={{ height: "100vh" }} class="overflow-x-auto shadow-md">
        <h1 className="text-2xl p-4">Products Listed for Buyer Request</h1>
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
                Views
              </th>
              <th scope="col" class="px-6 py-3">
                Price (PKr)
              </th>
              <th scope="col" class="px-6 py-3">
                Condition
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over list of products and filter out products which are listed as BuyerRequest */}
            {!loading && mode === "Buyer Request" ? (
              products.map((product) =>
                product.listFor === "Buyer Request" ? (
                  <BuyerRequestProductRow product={product} mode={mode} />
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
  );
}

export default CurrentUserBuyerRequest;

import React, { useEffect, useState } from "react";
import "./Total.css";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SalesItems from "../../../components/SalesItems/SalesItems";
import { useSelector } from "react-redux";
import { publicRequest } from "../../../requestMethods";
import { loader } from "../../../loader";
function Pending() {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  // fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      const allProducts = await publicRequest.get(
        `/product/sell/all/${user._id}`
      );
      setPendingProducts(allProducts.data.pendingProducts);

      setLoading(false);
    };
    fetchAllProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div className="total">
        <Sidebar />
        {!loading ? (
          pendingProducts.length > 0 ? (
            <SalesItems title="Pending Products" products={pendingProducts} />
          ) : (
            <div className="loader">
              <h2 style={{ color: "gray" }}>No Pending Products Yet</h2>
            </div>
          )
        ) : (
          <div className="loader">
            <img src={loader} width={30} />
          </div>
        )}
      </div>
    </>
  );
}

export default Pending;

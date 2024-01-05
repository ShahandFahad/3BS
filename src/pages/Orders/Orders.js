import React from "react";
import "./Orders.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Sales from "../../components/Sales/Sales";
import Profit from "../../components/Profit/Profit";
import SingleTransaction from "./SingleTransaction/SingleTransaction";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { loader } from "../../loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  // fetch all transactions
  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      const allOrders = await publicRequest.get(`/order/all/${user._id}`);
      setOrders(allOrders.data);
      setLoading(false);
    };
    fetchOrders();
  }, []);
  return (
    <>
      <div className="orders" style={{ marginTop: "100px" }}>
        {/* Sales */}
        <div className="transaction__container">
          <div className="transaction__header">
            <h1>Orders</h1>
          </div>
          {/* single Transaction */}

          {/* single Transaction */}
          {!loading ? (
            orders.length > 0 ? (
              orders.map((order) => (
                <SingleTransaction key={order._id} order={order} />
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <img
                  src="https://th.bing.com/th/id/OIP.RY8og1hAuWLb-jV1qqibxQAAAA?pid=ImgDet&rs=1"
                  width={200}
                />
              </div>
            )
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <img src={loader} width={30} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;

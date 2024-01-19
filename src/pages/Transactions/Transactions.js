import React from "react";
import "./Transactions.css";
// import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import Sidebar from "../../components/Sidebar/Sidebar";
import Sales from "../../components/Sales/Sales";
import Profit from "../../components/Profit/Profit";
import SingleTransaction from "./SingleTransaction/SingleTransaction";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { loader } from "../../loader";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  // fetch all transactions
  useEffect(() => {
    setLoading(true);
    const fetchTransactions = async () => {
      const allTransactions = await publicRequest.get(
        `/transaction/all/${user._id}`
      );
      setTransactions(allTransactions.data);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Navbar2 />
      <div className="transactions">
        {/* Sidebar */}
        <Sidebar />
        {/* Sales */}
        <div className="transaction__container">
          <div className="transaction__header">
            <h1>Transactions</h1>
          </div>
          {/* single Transaction */}

          {/* single Transaction */}
          {!loading ? (
            transactions.length > 0 ? (
              transactions.map((transaction) => (
                <SingleTransaction
                  key={transaction._id}
                  transaction={transaction}
                />
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
                marginTop: "100px",
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

export default Transactions;

import React from "react";
import "./SingleTransaction.css";
import { useState } from "react";
import TransactionModal from "../../../components/TransactionModal/TransactionModal";
import { publicRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";
function SingleTransaction({ transaction }) {
  console.log(transaction);
  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.user);
  let transactionCreatedAt = new Date(transaction?.createdAt).toLocaleString(
    "en-US",
    {
      day: "numeric",
      year: "numeric",
      month: "long",
    }
  );

  const handleConfirm = async (id) => {
    const update = await publicRequest.put(`/product/sell/edit/${id}`, {
      status: "Sold",
    });
    const updateOrder = await publicRequest.put(`/order/edit/status/${id}`, {
      status: "Sold",
    });
    const updateTransactions = await publicRequest.put(
      `/transaction/edit/status/${id}`,
      {
        status: "Sold",
      }
    );
    const notification = await publicRequest.post(`/notifications`, {
      userId: user._id,
      notifyBy: user.fullName,
      text: `Congratulation ${user.fullName}, you have successfully purchased ${transaction.title} of (${transaction.price} (PKR). `,
    });
    const sellerNotification = await publicRequest.post(`/notifications`, {
      userId: transaction.belongsToId,
      notifyBy: user.fullName,
      text: `Congratulation ${transaction.belongsToName}, you have recieved ${transaction.price} (PKR) by ${user.fullName} for product (${transaction.title})`,
    });
    window.location.reload();
  };

  return (
    <div className="single__transaction">
      {modal && <TransactionModal product={transaction} setModal={setModal} />}
      <p>{transaction._id}</p>
      <p>{transactionCreatedAt}</p>
      <p>{transaction.price}</p>
      <p className="details__btn" onClick={() => setModal(true)}>
        Product Details
      </p>
      <p
        className="transaction__status"
        style={{
          backgroundColor:
            transaction.status === "Pending" ? "#EE63AE" : "#4FDA86",
        }}
      >
        {transaction.status === "Sold" ? "Confirmed" : transaction.status}
      </p>
      {transaction.status === "Pending" ? (
        <div className="actions">
          <button
            className="confirm__btn"
            onClick={() => handleConfirm(transaction.productId)}
          >
            Confirm
          </button>
          <button className="cancel__btn">Cancel</button>
        </div>
      ) : (
        <div className="actions">
          <p className="finilaze__btn">It's Finalized</p>
        </div>
      )}
    </div>
  );
}

export default SingleTransaction;

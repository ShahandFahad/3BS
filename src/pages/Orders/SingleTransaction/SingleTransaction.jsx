import React, { useState } from "react";
import "./SingleTransaction.css";
import TransactionModal from "../../../components/TransactionModal/TransactionModal";
import BuyerModal from "../../../components/BuyerModal/BuyerModal";
function SingleTransaction({ order }) {
  const [modal, setModal] = useState(false);
  const [buyerModal, setBuyerModal] = useState(false);
  let orderCreatedAt = new Date(order?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
  return (
    <div className="single__transaction">
      {modal && <TransactionModal product={order} setModal={setModal} />}
      {buyerModal && <BuyerModal order={order} setModal={setBuyerModal} />}
      <p>{order._id}</p>
      <p>{orderCreatedAt}</p>
      <p>{order.price}</p>
      <p className="details__btn product" onClick={() => setModal(true)}>
        Product Details
      </p>
      <p className="details__btn buyer" onClick={() => setBuyerModal(true)}>
        Buyer Details
      </p>
      <p
        className="transaction__status"
        style={{
          backgroundColor:
            order.status === "Pending" || "pending" ? "#EE63AE" : "#4FDA86",
        }}
      >
        {order.status}
      </p>
    </div>
  );
}

export default SingleTransaction;

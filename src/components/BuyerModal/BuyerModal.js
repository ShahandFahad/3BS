import React from "react";
import { useState } from "react";

function BuyerModal({ setModal, order }) {
  return (
    <div className="transaction__modal">
      <div className="close__modal" onClick={() => setModal(false)}>
        X
      </div>
      {/* product Details */}
      <div className="transaction__details">
        <img src={order.buyerPicture} />
        <div className="details__others">
          <h1>{order.buyerName}</h1>
          <p>{order.buyerDescription}</p>
          <h1>
            Level <span> {order.buyerLevel}</span>{" "}
          </h1>

          <div className="location">
            <h1>Rating: </h1>
            <p>{order.buyerRating} Stars</p>
          </div>
        </div>
        <p className="closeBtn" onClick={() => setModal(false)}>
          Close
        </p>
      </div>
    </div>
  );
}

export default BuyerModal;

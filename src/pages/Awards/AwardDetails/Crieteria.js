import React from "react";
import "./AwardDetails.css";

function Crieteria() {
  return (
    <div className="crieteria">
      <h2>Crieteria</h2>
      <p>
        Sold product <span> 20 </span>, rating <span> 4.5 </span> -{" "}
        <span> 5 </span> = <span> 3% </span> of <span> total </span> selling
        amount
      </p>
      <p>
        Sold product <span> 20 </span>, rating <span> 4 </span> -{" "}
        <span> 4.5 </span> = <span> 2% </span> of <span> total </span> selling
        amount
      </p>
      <p>
        Sold product <span> 20 </span>, rating <span> 3.5 </span> -{" "}
        <span> 4 </span> = <span> 1% </span> of <span> total </span> selling
        amount
      </p>
    </div>
  );
}

export default Crieteria;

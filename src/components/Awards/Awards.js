import React from "react";
import "./Awards.css";
import Award from "./Award/Award";
import AwardState from "./AwardsStats";
function Awards() {
  return (
    <div className="sales">
      <Award />
      <AwardState />
    </div>
  );
}

export default Awards;

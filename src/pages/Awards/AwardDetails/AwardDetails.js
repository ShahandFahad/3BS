import React from "react";
import "./AwardDetails.css";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";

import Crieteria from "./Crieteria";

function AwardDetails() {
  return (
    <>
      <Navbar />
      <div className="award__details">
        <Sidebar />
        <div className="award__contents">
          <div className="contents">
            <div className="level">
              <img src="https://www.f6aoj.ao-journal.com/crbst_blue1stshad.gif" />
              <h2>Level Is Successfully Completed</h2>
            </div>
            <p>
              Dear <span> Sami </span>, you have successfully sold{" "}
              <span> 20 </span> products. Your current rating is{" "}
              <span> 4.5 </span>, and your total selling amount is{" "}
              <span> 20,000 </span> PKR. It means you deserve <span> 3% </span>{" "}
              amount of your total selling amount as award by
              <span> SERB </span>.
            </p>
          </div>
          {/* award formual */}
          <div className="award__formula">
            <p className="awardP">Award = (20,000 / 100) * 3</p>
            <p className="awardP">
              Award = 600 <span>(PKR)</span>
            </p>
          </div>
          {/* criteria */}
          <Crieteria />

          {/* Award Icon */}
          <img
            src="https://cdn.dribbble.com/users/393953/screenshots/1498167/browserpreview_tmp-1.gif"
            width={180}
          />
          <h2>
            600 <span style={{ fontSize: "14px" }}>(PKR)</span>
          </h2>
          <button className="collect">Collect Now</button>
        </div>
      </div>
    </>
  );
}

export default AwardDetails;

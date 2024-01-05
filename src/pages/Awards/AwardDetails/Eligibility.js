import React from "react";
import "./AwardDetails.css";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";

import Crieteria from "./Crieteria";

function Eligibility() {
  return (
    <>
      <Navbar />
      <div className="award__details">
        <Sidebar />
        <div className="award__contents">
          <div className="contents">
            <div className="level">
              <h2>Note</h2>
            </div>
            <p>
              Sorry <span>Sami</span>, you are not <span>eligible</span> right
              now. To get award, you need to sell<span> 20</span> products
              successfully. Currently you have sold <span> 11</span>
              products and your total selling amount is <span>250,000</span>
              <span style={{ fontSize: "14px" }}> (PKR)</span>.
            </p>
          </div>

          {/* criteria */}
          <Crieteria />
          {/* not eligible */}
          <img src="https://th.bing.com/th/id/R.92e27f58b554384bffc9eea6a1bad20b?rik=Z389ezD6hKoORQ&riu=http%3a%2f%2fwindows-addict.com%2fsorry.png&ehk=jVA91OrHK%2bbSwy72OaIofBzYZ3REEiTOwqYSXgNC97c%3d&risl=&pid=ImgRaw&r=0" />
          <h2>Sami, You Are Not Eligible Right Now</h2>
        </div>
      </div>
    </>
  );
}

export default Eligibility;

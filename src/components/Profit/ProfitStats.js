import React, { useEffect } from "react";
import "./Sales.css";

import {
  LineChart,
  YAxis,
  Tooltip,
  XAxis,
  Line,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
const data = [
  { name: "Jan", uv: 1200 },
  { name: "Feb", uv: 800 },
  { name: "March", uv: 120 },
  { name: "Apr", uv: 1430 },
  { name: "May", uv: 130 },
  { name: "June", uv: 2000 },
];
function ProfitStats() {
  const [profit, setProfit] = useState();
  const user = useSelector((state) => state.user);
  // fetch current profit/revenu
  useEffect(() => {
    const fetchProfit = async () => {
      const gotProfit = await publicRequest.get(`/order/total/${user._id}`);
      setProfit(gotProfit.data);
    };
    fetchProfit();
  }, [profit]);
  return (
    <div className="saleStats">
      <h1>Revenue</h1>
      {/* <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart> */}
      {/* Total */}
      <div className="total__revenue">
        <h1>Currently, You Have Total Amount Of</h1>
        <h1 style={{ fontSize: "60px" }}>
          {profit?.length > 0 ? profit[0].total : 0}
          <span style={{ fontSize: "20px" }}>(PKR)</span>
        </h1>
      </div>
    </div>
  );
}

export default ProfitStats;

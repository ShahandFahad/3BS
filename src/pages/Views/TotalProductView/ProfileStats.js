import React, { PureComponent, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Views.css";
import { publicRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";
const data = [
  { name: "Jan", vw: 13 },
  { name: "Feb", vw: 160 },
  { name: "Mar", vw: 18 },
  { name: "Apr", vw: 400 },
];
function ProfileStats() {
  const [statsData, setStatsData] = useState([]);
  const user = useSelector((state) => state.user);
  const [productViews, setProductViews] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await publicRequest.get(
        `/productviews/allviews/${user._id}`
      );
      setProductViews(fetched.data);
    };
    fetchProducts();
  }, []);
  // fetch views
  useEffect(() => {
    const fetchViews = async () => {
      const fetched = await publicRequest.get(
        `/productviews/stats/${user._id}`
      );
      setStatsData(fetched.data);
    };
    fetchViews();
  }, []);
  return (
    <div style={{ width: "80%", height: 400 }} className="saleStats">
      <h1>Total Products Views {productViews.length}</h1>
      <ResponsiveContainer>
        <AreaChart
          data={statsData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfileStats;

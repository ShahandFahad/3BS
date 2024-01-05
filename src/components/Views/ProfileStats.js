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

import "./ProfileView.css";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
function ProfileStats() {
  const [statsData, setStatsData] = useState([]);
  const user = useSelector((state) => state.user);
  const [profileViews, setProfileViews] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await publicRequest.get(
        `/profileviews/allviews/${user._id}`
      );
      setProfileViews(fetched.data);
    };
    fetchProducts();
  }, []);
  // fetch views
  useEffect(() => {
    const fetchViews = async () => {
      const fetched = await publicRequest.get(
        `/profileviews/stats/${user._id}`
      );
      setStatsData(fetched.data);
    };
    fetchViews();
  }, []);

  return (
    <div style={{ width: "90%", height: 400 }} className="saleStats">
      <h1>Total Profile Views {profileViews.length}</h1>
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

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Awards";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Target Products", "Sold Products"],
  datasets: [
    {
      label: "Product",
      data: [20, 11],
      backgroundColor: ["#3A6562", "#C23FBE"],
      borderWidth: 1,
    },
  ],
};
//
function AwardStats() {
  return (
    <div className="saleStats">
      <h1>Awards</h1>
      <div className="chart">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default AwardStats;

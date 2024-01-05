import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Sales.css";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
ChartJS.register(ArcElement, Tooltip, Legend);

//
function SaleStats() {
  const user = useSelector((state) => state.user);
  const [allProducts, setAllProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      const allProducts = await publicRequest.get(
        `/product/sell/all/${user._id}`
      );
      setAllProducts(allProducts.data.allProducts);
      setAvailableProducts(allProducts.data.availableProducts);
      setSoldProducts(allProducts.data.soldProducts);
      setPendingProducts(allProducts.data.pendingProducts);
      setLoading(false);
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="saleStats">
      <h1>Sales</h1>
      <div className="chart">
        <Pie
          data={{
            labels: ["Total", "Available", "Sold", "Pending"],
            datasets: [
              {
                label: "Product",
                data: [
                  allProducts.length,
                  availableProducts.length,
                  soldProducts.length,
                  pendingProducts.length,
                ],
                backgroundColor: ["#3A6562", "#20365A", "#7A39A2", "#C23FBE"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default SaleStats;

import React, { useEffect, useState } from "react";
import "./RecentProducts.css";
// import { products } from "../../products";
import RecentProduct from "./RecentProduct/RecentProduct";
import { publicRequest } from "../../requestMethods";
import { loader } from "../../loader";
function RecentProducts({ title, items }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch recent products
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const fetched = await publicRequest.get("/product/recentproducts");
      setProducts(fetched.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return !loading ? (
    <div className="recent__products">
      <h1 className="text-xl">{title}</h1>
      <div className="border p-6  rounded-md bg-gray-100 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <RecentProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  ) : (
    <div className="loader">
      <img alt="" src={loader} style={{ margin: "50px 0" }} />
    </div>
  );
}

export default RecentProducts;

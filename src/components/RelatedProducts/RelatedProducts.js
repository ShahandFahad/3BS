import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import { products } from "../../products";
import RelatedProduct from "./RelatedProduct/RelatedProduct";
import { publicRequest } from "../../requestMethods";

function RecentProducts({ title, items, id }) {
  const [related, setRelated] = useState([]);
  const [product, setProduct] = useState("");
  const [loading, setloading] = useState(false);
  // fetch Single product
  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      const fetched = await publicRequest.get(`/product/sell/details/${id}`);
      setProduct(fetched.data.details.category);
      setloading(false);
    };
    fetchData();
  }, []);

  // fetch Related products
  useEffect(() => {
    const fetchData = async () => {
      const fetched = await publicRequest.get(
        `/product/sell/relatedproducts?category=${product}`
      );
      setRelated(fetched.data);
    };
    fetchData();
  }, [product]);
  return !loading ? (
    <div className="recent__products">
      <h1>{title}</h1>
      <div className="products__container">
        {related?.map((product) => (
          <RelatedProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default RecentProducts;

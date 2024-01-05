import Search from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import ExchangeProduct from "../../components/ExchangeProduct/ExchangeProduct";
import Gallary from "../../components/Gallary/Gallary";
import Navbar from "../../components/Navbar/Navbar";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import "./ExchangeProductDetail.css";
import { useParams } from "react-router";
import ExchangeProductDetails from "../../components/ProductDetails/ExchangeDetails";
import ExchangeGallary from "../../components/Gallary/ExchangeGallary";
import { userRequest } from "../../requestMethods";
import { loader } from "../../loader";
function ExchangeProductDetail({ id }) {
  const { productId } = useParams();
  const [exchangeProducts, setExchangeProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  // loading
  const [loading, setLoading] = useState(false);
  // get product category
  useEffect(() => {
    const getCat = async () => {
      setLoading(true);
      const gotCat = await userRequest.get(
        `/exchangeproduct/exchange/details/${productId}`
      );
      setCategory(gotCat.data.details.category);
      setLoading(false);
    };
    getCat();
  }, [productId]);

  // fetch all exchange related products
  useEffect(() => {
    const fetch = async () => {
      const fetched = await userRequest.get(
        `/exchangeproduct/exchange/relatedproducts?category=${category}`
      );
      setExchangeProducts(fetched.data);
    };
    fetch();
  }, [category]);

  const handleFilter = (text) => {
    setSearch(text);
    const searched = exchangeProducts.filter((item) =>
      item.title.includes(text)
    );
    setSearchProducts(searched);
  };

  return (
    <>
      <Navbar />
      <div className="exchange__product__detail">
        {/* Left */}
        <div className="left">
          <ExchangeGallary id={productId} />
          <ExchangeProductDetails id={productId} mode="exchange" load={false} />
        </div>
        {/* Right */}
        {!loading ? (
          <div className="right">
            <p className="right__title">Exchange Your Product With</p>
            <div className="right__input">
              <input
                type="text"
                placeholder="Search here..."
                value={search}
                onChange={(e) => handleFilter(e.target.value)}
              />
              <Search />
            </div>
            {/* Exchange Product */}

            <div className="exchange__products">
              {searchProducts.length < 1
                ? exchangeProducts.map((product) => (
                    <ExchangeProduct key={product._id} product={product} />
                  ))
                : searchProducts.map((product) => (
                    <ExchangeProduct key={product._id} product={product} />
                  ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ExchangeProductDetail;

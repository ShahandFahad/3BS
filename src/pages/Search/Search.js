import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SoldProduct from "../../components/SoldProducts/Product/Product";
import { loader, oops } from "../../loader";
import { publicRequest } from "../../requestMethods";
import "./Search.css";
function Search() {
  const search = useLocation().search;
  const product = new URLSearchParams(search).get("product");
  const [searchProducts, setSearchProducts] = useState([]);
  //   loading
  const [loading, setLoading] = useState(false);
  // fetch the search product
  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      try {
        const searched = await publicRequest.get(
          `/product/sell/find?search=${product}`
        );
        setSearchProducts(searched.data);
        setLoading(false);
        console.log(searched.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    searchProducts();
  }, [product]);

  return (
    <>
      <Navbar />
      <div className="search">
        <h1>Search for "{product}"</h1>
        {!loading ? (
          searchProducts.length === 0 ? (
            <div className="searched__products oops">
              <img src={oops} className="oops__img" />
              <h2>Sorry, product is not found</h2>
            </div>
          ) : (
            <div className="searched__products">
              {searchProducts.map((product) => (
                <SoldProduct key={product._id} product={product} />
              ))}
            </div>
          )
        ) : (
          <div className="searched__products">
            <img src={loader} width={40} />
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

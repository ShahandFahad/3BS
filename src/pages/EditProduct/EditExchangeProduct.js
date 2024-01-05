import { usePreviousProps } from "@mui/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ExchangeProductForm from "../../components/ProductForm/ExchangeProductForm";
import ProductForm from "../../components/ProductForm/ProductForm";
import { userRequest } from "../../requestMethods";
function EditExchangeProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  // fecth product
  useEffect(() => {
    const fetchData = async () => {
      const fetched = await userRequest.get(
        `/exchangeproduct/exchange/details/${productId}`
      );
      setProduct(fetched.data);
    };
    fetchData();
  }, [productId]);
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* New Product */}

      <h1 className="new__product__page__title">Edit Product</h1>

      <div className="new__product">
        {/* form */}
        <div className="product__form">
          <ExchangeProductForm behave="edit" product={product} />
        </div>
      </div>
    </>
  );
}

export default EditExchangeProduct;

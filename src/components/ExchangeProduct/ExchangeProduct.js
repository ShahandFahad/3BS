import React, { useEffect, useState } from "react";
import "./ExchangeProduct.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function ExchangeProduct({ product }) {
  const user = useSelector((state) => state.user);

  // // exchange product by ---- fetch user
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const fetched = await publicRequest.get(
        `user/details/singleuser/${product.userId}`
      );
      setUserDetails(fetched.data);
    };
    fetchUser();
  }, [product]);
  //   // handle click views
  const handleViewsClick = async (id) => {
    try {
      const addView = await publicRequest.post(`/productviews/add`, {
        productId: id,
        viewer: user._id,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    user._id !== product.userId && (
      <Link
        to={`/exchangewithproductdetails/${product._id}`}
        className="exchange__product__page"
        onClick={() => handleViewsClick(product._id)}
      >
        <img src={product.photos[0]} />
        <p className="product__title">{product.title}</p>
        <p className="product__condition">• {product.condition}</p>
        {/* Product Footer */}
        <div className="product__footer">
          {/* Footer Left */}

          <div className="footer__left">
            <img src={userDetails?.profileImage} />
            <p>{userDetails?.fullName}</p>
          </div>
        </div>
      </Link>
    )
  );
}
export default ExchangeProduct;

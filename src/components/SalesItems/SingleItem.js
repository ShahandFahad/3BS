import React, { useEffect, useState } from "react";
import "./SalesItems.css";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { publicRequest, userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
function SingleItem({ product }) {
  // views
  const [views, setViews] = useState("");

  // fetch views
  useEffect(() => {
    const fetchViews = async () => {
      const fetchedVeiws = await publicRequest.get(
        `/productviews/allviews/find/${product._id}`
      );
      setViews(fetchedVeiws.data);
    };
    fetchViews();
  }, []);

  // since added product
  let productDate = new Date(product?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
  // handle delete
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "This product will be deleted parmanently."
    );
    if (confirmation) {
      try {
        const products = await userRequest.delete(`/product/sell/delete/${id}`);
        alert("Product Deleted Successfully!!!");
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };
  return (
    <div className="single__item">
      <img src={product.photos[0]} />
      <p className="title">{product.title}</p>
      <div className="seen">
        <RemoveRedEyeOutlinedIcon />
        <p>{views.length}</p>
      </div>
      <p className="price">{product.price}</p>
      <p className="condition">{product.condition}</p>

      <p className="status">{product.status}</p>
      <p className="createdAt" style={{ fontSize: "13px" }}>
        {productDate}
      </p>
      <div className="actions">
        <DeleteOutlineIcon onClick={() => handleDelete(product._id)} />
        {product.status === "Available" && (
          <Link to={`/editproduct/${product._id}`}>
            <EditIcon />
          </Link>
        )}
      </div>
    </div>
  );
}

export default SingleItem;

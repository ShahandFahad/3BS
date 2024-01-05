import React, { useEffect, useState } from "react";
import "./ProductForm.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { storage } from "../../firebase";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loader } from "../../loader";

function ExchangeProductForm({ behave, product }) {
  const user = useSelector((state) => state.user);
  const [error, setError] = useState("");

  // navigation
  const navigate = useNavigate();
  // loading
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    category: "",
    title: "",
    description: "",
    modal: "",
    location: "",
    condition: "",
    price: null,
  });
  const [allPhotos, setAllPhotos] = useState([]);
  let sendAllphotos = [];
  // set image
  const [image, setImage] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });
  const [showImg, setShowImg] = useState({
    showImg1: null,
    showImg2: null,
    showImg3: null,
    showImg4: null,
    showImg5: null,
  });
  // handle image
  const handleChange = (image, number) => {
    if (image && number === "first") {
      setImage(image);
      setShowImg({ ...showImg, showImg1: URL.createObjectURL(image) });
      setAllPhotos([...allPhotos, image]);
    } else if (image && number === "second") {
      setImage(image);
      setShowImg({ ...showImg, showImg2: URL.createObjectURL(image) });
      setAllPhotos([...allPhotos, image]);
    } else if (image && number === "third") {
      setImage(image);
      setShowImg({ ...showImg, showImg3: URL.createObjectURL(image) });
      setAllPhotos([...allPhotos, image]);
    } else if (image && number === "fourth") {
      setImage(image);
      setShowImg({ ...showImg, showImg4: URL.createObjectURL(image) });
      setAllPhotos([...allPhotos, image]);
    } else if (image && number === "fifth") {
      setImage(image);
      setShowImg({ ...showImg, showImg5: URL.createObjectURL(image) });
      setAllPhotos([...allPhotos, image]);
    }
  };

  // handle Click
  const handleClick = async () => {
    // check if all the required fields are fill
    if (
      !newProduct.category ||
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.location ||
      !newProduct.condition ||
      allPhotos.length < 5
    ) {
      setError("Please fill the required fields");
      return false;
    } else {
      setLoading(true);

      allPhotos.forEach((item) => {
        const uploadTask = storage.ref(`/exchange/${item.name}`).put(item);
        uploadTask.on(
          "state_changes",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (err) => {
            console.log(err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              sendAllphotos.push(url);
              if (sendAllphotos.length === 5) {
                userRequest.post(`/exchangeproduct/exchange/add`, {
                  userId: user._id,
                  category: newProduct.category,
                  title: newProduct.title,
                  description: newProduct.description,
                  modal: newProduct.modal,
                  location: newProduct.location,
                  condition: newProduct.condition,
                  price: newProduct.price,
                  photos: sendAllphotos,
                });
                navigate("/");
                setLoading(false);
              }
            });
          }
        );
      });
    }
  };

  // Edit Options
  const [editProduct, setEditProduct] = useState(null);
  // fetch the current product
  useEffect(() => {
    const fetchProduct = async () => {
      const fetched = await userRequest.get(
        `/exchangeproduct/exchange/details/${product?.details._id}`
      );
      setEditProduct(fetched.data.details);
    };
    fetchProduct();
  }, [product]);
  // handle update
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const edited = await userRequest.put(
        `/exchangeproduct/exchange/edit/${product.details._id}`,
        {
          category: editProduct.category,
          title: editProduct.title,
          description: editProduct.description,
          modal: editProduct.modal,
          location: editProduct.location,
          condition: editProduct.condition,
          price: editProduct.price,
        }
      );
      edited && navigate("/exchangeproducts");
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return behave !== "edit" ? (
    <div className="form">
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      <div className="single__input">
        <p className="label" style={{ marginBottom: "10px" }}>
          Category
        </p>

        <select
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          <option hidden>Category</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Birds">Birds</option>
          <option value="Furniture">Furniture</option>
          <option value="Motercycles">Motercycles</option>
        </select>
      </div>
      <div className="single__input">
        <p className="label">Title</p>
        <input
          type="text"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
      </div>
      <div className="single__input">
        <p className="label">Description</p>
        <textarea
          className="desc"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        ></textarea>
      </div>
      {/* <Modal and Location */}
      <div className="modal__location">
        <div className="modal__location__box">
          <AddIcon />
          <p>Modal</p>
        </div>
        <div className="modal__location__box">
          <LocationOnIcon />
          <p>Location</p>
        </div>
      </div>
      <div
        className="single__input"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <input
          type="text"
          value={newProduct.modal}
          onChange={(e) =>
            setNewProduct({ ...newProduct, modal: e.target.value })
          }
          style={{ flexBasis: "10%", marginRight: "25px" }}
        />
        <input
          type="text"
          value={newProduct.location}
          onChange={(e) =>
            setNewProduct({ ...newProduct, location: e.target.value })
          }
          style={{ flexBasis: "68%" }}
        />
      </div>

      {/* Condition */}
      <div className="single__input">
        <p className="label">Condition</p>
        <div className="input__conidtion">
          <label for="new">
            <input
              type="radio"
              id="new"
              name="conition"
              value="New"
              onChange={(e) =>
                setNewProduct({ ...newProduct, condition: e.target.value })
              }
              checked
            />
            <p>New</p>
          </label>
          <label for="used">
            <input
              type="radio"
              id="used"
              name="conition"
              value="Used"
              onChange={(e) =>
                setNewProduct({ ...newProduct, condition: e.target.value })
              }
            />
            <p>Used</p>
          </label>
        </div>
      </div>
      {/* Price Section */}
      <div className="single__input price__input">
        <p className="label">Price</p>
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          style={{ width: "125px" }}
        />
        <p className="pkr">PKR</p>
      </div>
      {/* Images Section */}
      <div className="single__input">
        <p className="label" style={{ margin: "10px 0" }}>
          Upload up to 5 photos
        </p>
        <div className="input__photos">
          <label htmlFor="file1">
            {showImg.showImg1 !== null ? (
              <img src={showImg.showImg1} />
            ) : (
              <AddAPhotoIcon />
            )}
            <input
              type="file"
              id="file1"
              onChange={(e) => handleChange(e.target.files[0], "first")}
            />
          </label>
          <label htmlFor="file2">
            {showImg.showImg2 !== null ? (
              <img src={showImg.showImg2} />
            ) : (
              <AddAPhotoIcon />
            )}
            <input
              type="file"
              id="file2"
              onChange={(e) => handleChange(e.target.files[0], "second")}
            />
          </label>
          <label htmlFor="file3">
            {showImg.showImg3 !== null ? (
              <img src={showImg.showImg3} />
            ) : (
              <AddAPhotoIcon />
            )}
            <input
              type="file"
              id="file3"
              onChange={(e) => handleChange(e.target.files[0], "third")}
            />
          </label>
          <label htmlFor="file4">
            {showImg.showImg4 !== null ? (
              <img src={showImg.showImg4} />
            ) : (
              <AddAPhotoIcon />
            )}
            <input
              type="file"
              id="file4"
              onChange={(e) => handleChange(e.target.files[0], "fourth")}
            />
          </label>
          <label htmlFor="file5">
            {showImg.showImg5 !== null ? (
              <img src={showImg.showImg5} />
            ) : (
              <AddAPhotoIcon />
            )}
            <input
              type="file"
              id="file5"
              onChange={(e) => handleChange(e.target.files[0], "fifth")}
            />
          </label>
        </div>
      </div>

      {/* Submit Section */}
      <div className="submit__section">
        <button className="cancel__button">Cancel</button>
        <button className="post__button" onClick={handleClick}>
          {!loading ? "Post" : <img src={loader} width={10} />}
        </button>
      </div>
    </div>
  ) : (
    // Edited

    <div className="form">
      <div className="single__input">
        <p className="label" style={{ marginBottom: "10px" }}>
          Categorys
        </p>
        <select
          onChange={(e) =>
            setEditProduct({ ...editProduct, category: e.target.value })
          }
        >
          <option selected value={editProduct?.category}>
            {editProduct?.category}
          </option>
          <option value="Vehicles">Vehicles</option>
          <option value="Birds">Birds</option>
          <option value="Furniture">Furniture</option>
          <option value="Motercycles">Motercycles</option>
        </select>
      </div>
      <div className="single__input">
        <p className="label">Title</p>
        <input
          type="text"
          value={editProduct?.title}
          onChange={(e) =>
            setEditProduct({ ...editProduct, title: e.target.value })
          }
        />
      </div>
      <div className="single__input">
        <p className="label">Description</p>
        <textarea
          className="desc"
          value={editProduct?.description}
          onChange={(e) =>
            setEditProduct({ ...editProduct, description: e.target.value })
          }
        ></textarea>
      </div>
      {/* <Modal and Location */}
      <div className="modal__location">
        <div className="modal__location__box">
          <AddIcon />
          <p>Modal</p>
        </div>
        <div className="modal__location__box">
          <LocationOnIcon />
          <p>Location</p>
        </div>
      </div>
      <div
        className="single__input"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <input
          type="text"
          value={editProduct?.modal}
          onChange={(e) =>
            setEditProduct({ ...editProduct, modal: e.target.value })
          }
          style={{ flexBasis: "10%", marginRight: "25px" }}
        />
        <input
          type="text"
          value={editProduct?.location}
          onChange={(e) =>
            setEditProduct({ ...editProduct, location: e.target.value })
          }
          style={{ flexBasis: "68%" }}
        />
      </div>

      {/* Condition */}
      <div className="single__input">
        <p className="label">Condition</p>
        <div className="input__conidtion">
          <label for="new">
            <input
              type="radio"
              id="new"
              name="conition"
              value="New"
              onChange={(e) =>
                setEditProduct({ ...editProduct, condition: e.target.value })
              }
              // checked={product?.details?.condition === "New" ? true : false}
            />
            <p>New</p>
          </label>
          <label for="used">
            <input
              type="radio"
              id="used"
              name="conition"
              value="Used"
              onChange={(e) =>
                setEditProduct({ ...editProduct, condition: e.target.value })
              }
              // checked={product?.details?.condition === "Used" ? true : false}
            />
            <p>Used</p>
          </label>
        </div>
      </div>
      {/* Price Section */}
      <div className="single__input price__input">
        <p className="label">Price</p>
        <input
          type="text"
          value={editProduct?.price}
          onChange={(e) =>
            setEditProduct({ ...editProduct, price: e.target.value })
          }
          style={{ width: "125px" }}
        />
        <p className="pkr">PKR</p>
      </div>
      {/* Images Section */}
      <div className="single__input">
        <p className="label">Update photos</p>
        <div className="input__photos">
          <img src={product?.details?.photos[0]} />
          <img src={product?.details?.photos[1]} />
          <img src={product?.details?.photos[2]} />
          <img src={product?.details?.photos[3]} />
          <img src={product?.details?.photos[4]} />
        </div>
      </div>

      {/* Submit Section */}
      <div className="submit__section">
        <button className="cancel__button">Cancel</button>
        <button className="post__button" onClick={handleUpdate}>
          {!loading ? "Update" : <img src={loader} width={10} />}
        </button>
      </div>
    </div>
  );
}

export default ExchangeProductForm;

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
    <>
      <>
        <div className="space-y-12 px-36">
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <div style={{ width: "100%" }} className="pb-12">
            <h1 className="text-4xl text-center uppercase p-10 font-semibold leading-7 text-gray-900">
              {/* Add New Product For Barter: Exchnage */}
              Bartering
            </h1>

            <div
              style={{ width: "100%" }}
              class="flex flex-col gap-4 items-center"
            >
              {/* List for: Hardcoded value need to send for list type  */}
              <div className="w-96 flex rounded shadow-sm ring-1 ring-gray-300 sm:max-w-md">
                <input
                  className="h-12 block flex-1 border-0 bg-green-100 py-1.5 pl-3 text-gray-900 sm:text-sm sm:leading-6"
                  value="Bartering"
                />
              </div>
              {/* Product Name */}
              <div className="w-96 flex rounded shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="h-12 block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Product Name"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* Model: Hide for buyer request */}
              <div className="w-96 flex rounded shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input
                  type="text"
                  autoComplete="address-level2"
                  className="h-12 block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Model"
                  value={newProduct.modal}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, modal: e.target.value })
                  }
                />
              </div>

              {/* Address: Hide for buyer request */}

              <div className="w-96 flex rounded shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input
                  type="text"
                  autoComplete="address-level1"
                  className="h-12 block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Address"
                  value={newProduct.location}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              {/* Price */}
              <div className="w-96 flex rounded shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input
                  type="number"
                  className="h-12 block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </div>

              {/*  */}
              {/* Category */}
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  className="p-4 block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option hidden>Category</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Motercycles">Motercycles</option>
                  <option value="Motercycles">Furniture</option>
                  <option value="Motercycles">Vehicles</option>
                  <option value="Motercycles">Mobile Phones</option>
                  <option value="Motercycles">Computers</option>
                  <option value="Motercycles">Toys</option>
                  <option value="Motercycles">Houses</option>
                  <option value="Motercycles">Accessories</option>
                  <option value="Motercycles">Bikes</option>
                  <option value="Motercycles">Cars</option>
                </select>
              </div>

              {/* Condition */}
              <div className="input__conidtion">
                <label for="new">
                  <input
                    type="radio"
                    id="new"
                    name="conition"
                    value="New"
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        condition: e.target.value,
                      })
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
                      setNewProduct({
                        ...newProduct,
                        condition: e.target.value,
                      })
                    }
                  />
                  <p>Used</p>
                </label>
              </div>

              {/* Description */}
              <div className="col-span-full">
                {/* <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label> */}
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    placeholder="Write a few details about product."
                    rows={3}
                    className="block w-96 rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    defaultValue={""}
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className="single__input">
                {/* <h1 className="text-l font-semibold leading-7 text-gray-900">
                    Upload up to 5 photos
                  </h1> */}
                <div className="input__photos flex flex-wrap p-2 gap-2">
                  <label htmlFor="file1">
                    {showImg.showImg1 !== null ? (
                      <img
                        class="object-contain w-24 h-24"
                        src={showImg.showImg1}
                        alt=""
                      />
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
                      <img
                        src={showImg.showImg2}
                        class="object-contain w-24 h-24"
                        alt=""
                      />
                    ) : (
                      <AddAPhotoIcon />
                    )}
                    <input
                      type="file"
                      id="file2"
                      onChange={(e) =>
                        handleChange(e.target.files[0], "second")
                      }
                    />
                  </label>
                  <label htmlFor="file3">
                    {showImg.showImg3 !== null ? (
                      <img
                        src={showImg.showImg3}
                        alt=""
                        class="object-contain w-24 h-24"
                      />
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
                      <img
                        src={showImg.showImg4}
                        alt=""
                        class="object-contain w-24 h-24"
                      />
                    ) : (
                      <AddAPhotoIcon />
                    )}
                    <input
                      type="file"
                      id="file4"
                      onChange={(e) =>
                        handleChange(e.target.files[0], "fourth")
                      }
                    />
                  </label>
                  <label htmlFor="file5">
                    {showImg.showImg5 !== null ? (
                      <img
                        src={showImg.showImg5}
                        alt=""
                        class="object-contain w-24 h-24"
                      />
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

              {/*  */}
              <div className="btn-submit-custom flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="h-14 bg-red-500 hover:bg-red-700"
                  // onClick={handleCancelBtn}
                >
                  Cancel
                </button>
                <button
                  onClick={handleClick}
                  className="h-14 bg-green-500 hover:bg-green-700"
                >
                  {!loading
                    ? "Post"
                    : // <FidgetSpinner
                      //   visible={true}
                      //   height="40"
                      //   width="60"
                      //   ariaLabel="fidget-spinner-loading"
                      //   wrapperStyle={{}}
                      //   wrapperClass="fidget-spinner-wrapper"
                      // />
                      "loading..."}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
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
          <img src={product?.details?.photos[0]} alt="img" />
          <img src={product?.details?.photos[1]} alt="img" />
          <img src={product?.details?.photos[2]} alt="img" />
          <img src={product?.details?.photos[3]} alt="img" />
          <img src={product?.details?.photos[4]} alt="img" />
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

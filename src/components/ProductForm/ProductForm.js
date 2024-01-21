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
import { InfinitySpin } from "react-loader-spinner";

function ProductForm({ behave, product }) {
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
        const uploadTask = storage.ref(`/items/${item.name}`).put(item);
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
                userRequest.post(`/product/sell/add`, {
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
        `/product/sell/details/${product?.details._id}`
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
        `/product/sell/edit/${product.details._id}`,
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
      edited && navigate("/");
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return behave !== "edit" ? (
    <>
      <>
        <>
          <div className="space-y-12">
            {error && (
              <div className="error">
                <p>{error}</p>
              </div>
            )}
            <div className="border-b border-gray-900/10 pb-12">
              <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                Add New Product For Selling
              </h1>

              {/* Category */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Product name..."
                        value={newProduct.title}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few details about product.
                  </p>
                </div>

                {/* Model */}

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Model
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Model..."
                      value={newProduct.modal}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, modal: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Address..."
                      value={newProduct.location}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Price Pkr..."
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                    </select>
                  </div>
                </div>

                {/* Display For */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    List as
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      // onChange={(e) =>
                      //   setNewProduct({
                      //     ...newProduct,
                      //     category: e.target.value,
                      //   })
                      // }
                    >
                      <option hidden>Options</option>
                      <option value="Vehicles">Barter</option>
                      <option value="Furniture">Bidding</option>
                      <option value="Motercycles">Rent</option>
                    </select>
                  </div>
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
                </div>
              </div>
              {/* Images Section */}
              <div className="single__input">
                <h1 className="text-l font-semibold leading-7 text-gray-900">
                  Upload up to 5 photos
                </h1>
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
            </div>
          </div>
          {/* Submit Section */}
          {/* <div className="form">
            <div className="submit__section">
              <button className="cancel__button">Cancel</button>
              <button className="post__button" onClick={handleClick}>
                {!loading ? "Post" : <img src={loader} width={10} />}
              </button>
            </div>
          </div> */}
          <div className="btn-submit-custom mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="bg-red-500 hover:bg-red-700">
              Cancel
            </button>
            <button
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-700"
            >
              {!loading ? (
                "Post"
              ) : (
                // <FidgetSpinner
                //   visible={true}
                //   height="40"
                //   width="60"
                //   ariaLabel="fidget-spinner-loading"
                //   wrapperStyle={{}}
                //   wrapperClass="fidget-spinner-wrapper"
                // />
                <InfinitySpin
                  visible={true}
                  width="60"
                  height="30"
                  color="#FFFFFF"
                  ariaLabel="infinity-spin-loading"
                />
              )}
            </button>
          </div>
        </>
      </>
      {/* 
      
      - Incase of abnormal behaviour un comment this code and use it.
      - And comment the above code. Both of these are used for New product addition for selling 
      
      */}
      <div className="form">
        {/* {error && (
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
        </div> */}
        {/* <Modal and Location */}
        {/* <div className="modal__location">
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
        </div> */}

        {/* Condition */}
        {/* <div className="single__input">
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
        </div> */}
        {/* Price Section */}
        {/* <div className="single__input price__input">
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
        </div> */}
        {/* Images Section */}
        {/* <div className="single__input">
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
        </div> */}

        {/* Submit Section */}
        {/* <div className="submit__section">
          <button className="cancel__button">Cancel</button>
          <button className="post__button" onClick={handleClick}>
            {!loading ? "Post" : <img src={loader} width={10} />}
          </button>
        </div> */}
      </div>
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

export default ProductForm;

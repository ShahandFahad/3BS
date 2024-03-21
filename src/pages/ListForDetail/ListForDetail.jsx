import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar2";
import { publicRequest } from "../../requestMethods";

export default function ListForDetail() {
  const { productId } = useParams();

  const [details, setDetails] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [productOwnerDetail, setProductOwnerDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const [productImages, setProductImages] = useState([]);
  const [newPhoto, setNewPhoto] = useState(productImages[0]);
  // fetch product Details
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetched = await publicRequest.get(
        `/product/sell/details/${productId}`
      );
      setDetails(fetched.data);
      setProductDetail(fetched.data.details);
      setProductOwnerDetail(fetched.data.By);
      setProductImages(fetched.data.details.photos);
      setNewPhoto(fetched.data.details.photos[0]);
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(details, productDetail, productOwnerDetail);
  // time format
  let sinceJoin = new Date(productOwnerDetail.createdAt).toLocaleString(
    "en-US",
    {
      day: "numeric",
      year: "numeric",
      month: "long",
    }
  );

  return (
    <>
      <div class="antialiased">
        <Navbar />
        {!loading ? (
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                  <div>
                    <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                      <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                        <span class="text-5xl">
                          <img className="h-64" src={newPhoto} alt="" />
                        </span>
                      </div>
                    </div>

                    {/* Small Image Boxes: Iterate over and display only 4 */}
                    <div class="flex -mx-2 mb-4">
                      {!loading
                        ? productImages.map((productImage, index) =>
                            index < 4 ? (
                              <section x-for="i in 4">
                                <div class="flex-1 px-2">
                                  <button
                                    onClick={() => setNewPhoto(productImage)}
                                    class="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"
                                  >
                                    <span class="text-2xl">
                                      <img
                                        className="h-24"
                                        src={productImage}
                                        alt=""
                                      />
                                    </span>
                                  </button>
                                </div>
                              </section>
                            ) : (
                              <></>
                            )
                          )
                        : "loading"}
                    </div>
                  </div>
                </div>
                <div class="md:flex-1 px-4">
                  <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                    {productDetail.title}
                  </h2>
                  <p class="text-gray-500 text-sm">
                    By{" "}
                    <Link
                      to={`/profile/${productOwnerDetail._id}`}
                      class="text-indigo-600 hover:underline"
                    >
                      {productOwnerDetail.fullName}
                    </Link>
                  </p>

                  <div class="flex items-center space-x-4 my-4">
                    <div>
                      <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                        <span class="text-indigo-400 mr-1 mt-1">$</span>
                        <span class="font-bold text-indigo-600 text-3xl">
                          {productDetail.price}
                        </span>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="text-green-500 text-xl font-semibold">Since</p>
                      <p class="text-gray-400 text-sm">{sinceJoin}</p>
                    </div>
                  </div>

                  <p class="text-gray-500">{productDetail.description}</p>

                  <div class="flex py-4 space-x-4">
                    <button
                      type="button"
                      class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      Chat Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>loading</>
        )}
      </div>
    </>
  );
}

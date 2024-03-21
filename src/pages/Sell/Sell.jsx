import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar2";
import Footer from "../../components/Footer/Footer";
import ProductForm from "../../components/ProductForm/ProductForm";
import { Navigate } from "react-router";

export default function Sell() {
  const [checkedItem, setCheckedItem] = useState("");
  const [displayOptionButtons, setDisplayOptionButtons] = useState("block");
  const [displayForm, setDisplayForm] = useState(false);
  const options = [
    "Simple Sell",
    "Bidding",
    "Bartering",
    "Rent",
    "Buyer Request",
  ];

  const selectOption = (e) => {
    setCheckedItem(e.target.value);
    // console.log("Item checked:", e.target.value);
    setDisplayOptionButtons("hidden");
    setDisplayForm(true);
  };
  console.log(checkedItem);
  console.log(displayOptionButtons);

  return (
    <>
      <Navbar />
      {/* <h2 class="text-4xl text-center text-slate-900 font-bold tracking-tight sm:text-6xl">
        SELL
      </h2> */}
      <div
        class={`mt-20 h-80 flex font-sans justify-center items-center ${displayOptionButtons}`}
      >
        {/* <form class="flex-auto p-6"> */}
        <div class="flex items-baseline mt-4 mb-6 pb-6 border-slate-200 justify-center items-center ">
          <div class="flex gap-4">
            {/* Iterate over options */}
            {options.map((element) => (
              <label>
                <input
                  class="sr-only peer"
                  name="size"
                  type="radio"
                  value={element}
                  onChange={selectOption}
                />
                <div class="p-4 h-28 w-48 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white text-xl uppercase bg-slate-400  cursor-pointer">
                  {element}
                </div>
              </label>
            ))}
          </div>
        </div>
        {/* </form> */}
      </div>
      {checkedItem === "Simple Sell" && displayForm ? (
        <ProductForm
          title={"Simple Sell"}
          setDisplayOptionButtons={setDisplayOptionButtons}
          setDisplayForm={setDisplayForm}
        />
      ) : (
        ""
      )}
      {checkedItem === "Bidding" && displayForm ? (
        <ProductForm
          title={"Bidding"}
          setDisplayOptionButtons={setDisplayOptionButtons}
          setDisplayForm={setDisplayForm}
        />
      ) : (
        ""
      )}
      {/* Navigate to Exchange Form. Which Post Products to seperate exchange document in the database */}
      {checkedItem === "Bartering" && (
        <Navigate to="/addexchangeproduct" replace={false} />
      )}

      {/* {checkedItem === "Bartering" && displayForm ? (
        <ProductForm
          title={"Bartering"}
          setDisplayOptionButtons={setDisplayOptionButtons}
          setDisplayForm={setDisplayForm}
        />
      ) : (
        ""
      )} */}
      {checkedItem === "Rent" && displayForm ? (
        <ProductForm
          title={"Rent"}
          setDisplayOptionButtons={setDisplayOptionButtons}
          setDisplayForm={setDisplayForm}
        />
      ) : (
        ""
      )}
      {checkedItem === "Buyer Request" && displayForm ? (
        <ProductForm
          title={"Buyer Request"}
          setDisplayOptionButtons={setDisplayOptionButtons}
          setDisplayForm={setDisplayForm}
        />
      ) : (
        ""
      )}
      {/* <section className="p-10">
        <ProductForm />
      </section> */}
      <Footer />
    </>
  );
}

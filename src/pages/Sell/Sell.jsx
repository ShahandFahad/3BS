import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar2";
import Footer from "../../components/Footer/Footer";
import ProductForm from "../../components/ProductForm/ProductForm";

export default function Sell() {
  const [checkedItem, setCheckedItem] = useState("");
  const options = [
    "Simple Sell",
    "Bidding",
    "Bartering",
    "Rent",
    "Buyer Request",
    "",
  ];

  const selectOption = (e) => {
    setCheckedItem(e.target.value);
    // console.log("Item checked:", e.target.value);
  };
  console.log(checkedItem);

  return (
    <>
      <Navbar />
      {/* <h2 class="text-4xl text-center text-slate-900 font-bold tracking-tight sm:text-6xl">
        SELL
      </h2> */}
      <div class="mt-20 flex font-sans justify-center items-center">
        {/* <form class="flex-auto p-6"> */}
        <div class="flex items-baseline mt-4 mb-6 pb-6 border-slate-200 justify-center items-center">
          <div class="grid grid-cols-2 gap-4">
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
      {/* {checkedItem === "Simple Sell" ? <h1>Simple Spell</h1> : ""} */}
      {/* <section className="p-10">
        <ProductForm />
      </section> */}
      <Footer />
    </>
  );
}

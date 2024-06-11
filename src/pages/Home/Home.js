import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import SuggestCategories from "../../components/SuggestCategories/SuggestCategories";
import RecentProducts from "../../components/RecentProducts/RecentProducts";
import Footer from "../../components/Footer/Footer";
import Banner from "./Banner";
import ProuductByCategory from "../../components/RecentProducts/ProuductByCategory";
// TODO: Change the Navbar. Add Search and Other Links
function Home() {
  return (
    <>
      {/* <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
      <Navbar2 />
      <Banner />
      <SuggestCategories />
      {/* TODO: Make same file in recent prouducts, and return poducts based on vategory */}
      <RecentProducts title="Recent Products" items={4} />
      <ProuductByCategory
        title="Motercycles"
        items={4}
        category="Motercycles"
      />
      <ProuductByCategory title="Sneakers" items={4} category="Sneakers" />
      <ProuductByCategory title="Furniture" items={4} category="Furniture" />
      <ProuductByCategory title="Cars" items={4} category="Cars" />
      <ProuductByCategory title="Vehicles" items={4} category="Vehicles" />
      <ProuductByCategory title="Computers" items={4} category="Computers" />
      <ProuductByCategory title="Bikes" items={4} category="Bikes" />
      <ProuductByCategory
        title="Mobile Phones"
        items={4}
        category="Mobile Phones"
      />
      <ProuductByCategory title="Houses" items={4} category="Houses" />
      <ProuductByCategory title="Toys" items={4} category="Toys" />

      <Footer />
    </>
  );
}

export default Home;

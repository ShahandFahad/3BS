import React from "react";
import "./Home.css";
// import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import SuggestCategories from "../../components/SuggestCategories/SuggestCategories";
import RecentProducts from "../../components/RecentProducts/RecentProducts";
import Footer from "../../components/Footer/Footer";
import Banner from "./Banner";
import ProuductByCategory from "../../components/RecentProducts/ProuductByCategory";
import ProductForExchnageHomePage from "../../components/RecentProducts/ProductForExchnageHomePage";
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
      {/* Show simple sell products in recent and can visited via id */}
      <RecentProducts
        title="Recent Products"
        items={10}
        path="/product"
        listFor="Simple Sell"
      />

      {/* Donnot visit product details, only visit respective page for below */}
      <ProuductByCategory
        title="Bidding"
        items={4}
        listFor="Bidding"
        path="/biddedproducts"
      />
      {/* <ProuductByCategory
        title="Bartering"
        items={4}
        listFor="Bartering"
        path="/exchangeproducts"
      /> */}
      <ProductForExchnageHomePage
        title="Bartering"
        items={4}
        listFor="Bartering"
        path="/exchangeproducts"
      />
      <ProuductByCategory
        title="Rent"
        items={4}
        listFor="Rent"
        path="/rentproducts"
      />
      <ProuductByCategory
        title="Buyer Request"
        items={4}
        listFor="Buyer Request"
        path="/buyerrequestproducts"
      />

      <Footer />
    </>
  );
}

export default Home;

import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Navbar2 from "../../components/Navbar/Navbar2";
import SuggestCategories from "../../components/SuggestCategories/SuggestCategories";
import RecentProducts from "../../components/RecentProducts/RecentProducts";
import Footer from "../../components/Footer/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Navbar2/>
      <SuggestCategories />
      <RecentProducts title="Recent Products" items={10} />
      <Footer />
    </>
  );
}

export default Home;

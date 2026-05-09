import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveNews from "../components/LiveNews";

const Main = () => {
  return (
    <div className=" bg-white">
      <Navbar />
      <LiveNews />
      <div className=" px-2 md:px-14">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;

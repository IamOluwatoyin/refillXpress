import React from "react";
import Hero from "./Hero";
import CartRefill from "./CartRefill";
import CartGas from "./CartGas";
import About from "./About";
import Freq from "./Freq";
import ContantUs from "../ContantUs";
import Review from "./Review";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const HomePage = () => {
  return (
    <div>
      <Header/>
      <Hero />
      <CartRefill />
      <CartGas />
      <About />
      <Freq />
      <ContantUs />
      <Review />
      <Footer/>
    </div>
  );
};

export default HomePage;

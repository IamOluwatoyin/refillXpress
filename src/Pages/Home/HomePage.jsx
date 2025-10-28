import React from "react";
import Hero from "./Hero";
import CartRefill from "./CartRefill";
import CartGas from "./CartGas";
import About from "./About";
import Freq from "./Freq";
import Review from "./Review";
import Network from "./Network";
import ContantUs from "../ContantUs";

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
      <Network />
      <Freq />
      <Review />
      <Footer/>
    </div>
  );
};

export default HomePage;

import React from "react";
import Hero from "./Hero";
import CartRefill from "./CartRefill";
import CartGas from "./CartGas";
import About from "./About";
import Freq from "./Freq";
import ContantUs from "../ContantUs";
import Review from "./Review";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CartRefill />
      <CartGas />
      <About />
      <Freq />
      <ContantUs />
      <Review />
    </div>
  );
};

export default HomePage;

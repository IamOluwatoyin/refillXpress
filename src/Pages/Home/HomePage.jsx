import React from "react";
import Hero from "./Hero";
import CartRefill from "./CartRefill";
import CartGas from "./CartGas";
import About from "./About";
import Freq from "./Freq";
import Review from "./Review";
import Network from "./Network";
import ContantUs from "../ContantUs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CartRefill />
      <CartGas />
      <About />
      <Network />
      <Freq />
      <Review />
      <ContantUs />
    </div>
  );
};

export default HomePage;

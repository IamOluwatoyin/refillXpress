import React from "react";
import Hero from "./Hero";
import CartGas from "./cart-gas";
import About from "./About";
import Freq from "./Freq";
import Review from "./Review";
import Network from "./Network";
import RefillCart from "./RefillCart";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <RefillCart />
      <CartGas />
      <About />
      <Network />
      <Freq />
      <Review />
    </div>
  );
};

export default HomePage;

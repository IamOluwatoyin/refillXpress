import React from "react";
import Hero from "./Hero";
import CartRefill from "./CartRefill";
import CartGas from "./CartGas";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CartRefill />
      <CartGas />
    </div>
  );
};

export default HomePage;

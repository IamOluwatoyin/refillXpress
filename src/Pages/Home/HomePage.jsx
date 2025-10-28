import React from "react";
import Hero from "./Hero";
import CartRefill from "./CartRefill";
import CartGas from "./CartGas";
import About from "./About";
import Freq from "./Freq";
import Review from "./Review";
import Network from "./Network";


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
      
    </div>
  );
};

export default HomePage;

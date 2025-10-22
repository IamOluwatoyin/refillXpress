import React from "react";
import styled from "styled-components";
import HeroImage from "../../assets/Hero.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";

const Hero = () => {
  return (
    <Container>
      <img src={HeroImage} alt="Hero" />

      <Wrapper>
        <h3>
          Refill <span>Xpress</span>
        </h3>
        <p>Never run out of gas again </p>
        <p>We deliver gas to your door step</p>
        <ButtonHolder>
          <button className="box2">
            Order now <IoIosArrowRoundForward style={{ fontSize: "17px" }} />
          </button>
          <button className="box1">Become a vendor</button>
        </ButtonHolder>
      </Wrapper>
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ff80113e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40px;
  font-size: 48px;

  p {
    color: white;
  }

  h3 {
    color: #2887db;
    span {
      color: #ff7f11;
    }
  }
`;

const ButtonHolder = styled.div`
  width: 20%;
  height: 20%;
  display: flex;
  gap: 20px;
  align-items: center;

  .box1 {
    width: 170px;
    height: 50px;
    border: 1px solid white;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    background: transparent;
  }
  .box2 {
    width: 170px;
    height: 50px;
    background-color: #ff7f11;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

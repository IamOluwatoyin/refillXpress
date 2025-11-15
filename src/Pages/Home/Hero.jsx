import React from "react";
import styled from "styled-components";
import HeroImage from "../../assets/Hero.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router";

const Hero = () => {
  const nav = useNavigate();
  return (
    <Container id="home">
      <img src={HeroImage} alt="Hero" />

      <Wrapper>
        <h3>
          Refill <span>Xpress</span>
        </h3>
        <p>
          Never run out of gas again. We bring clean and verified gas right to
          your doorstep, fast and safely, so you can cook, relax, and enjoy your
          day without any worry.
        </p>

        <ButtonHolder>
          <button className="box1" onClick={() => nav("/usersignup")}>
            Order now <IoIosArrowRoundForward style={{ fontSize: "17px" }} />
          </button>
          <button className="box2" onClick={() => nav("/vendor-signup")}>
            Become a vendor
          </button>
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

  h3 {
    color: #2887db;
    font-size: 48px;
    margin: 0 0 10px 0;
    span {
      color: #ff7f11;
    }

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  p {
    color: white;
    font-size: 16px;
    width: 35%;
    line-height: 1.6;
    margin-top: 0;

    @media (max-width: 1024px) {
      width: 50%;
    }

    @media (max-width: 768px) {
      width: 85%;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 768px) {
    padding-left: 20px;
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
    background-color: #ff7f11;
    color: #fff;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    font-weight: 500;
  }

  .box2 {
    width: 170px;
    height: 50px;
    border: 1px solid white;
    color: #fff;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background-color: #fff;
      color: #2887db;
    }
  }

  @media (max-width: 1024px) {
    width: 35%;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    gap: 10px;

    .box1,
    .box2 {
      width: 140px;
      height: 40px;
      font-size: 14px;
    }
  }
`;

import React from "react";
import styled from "styled-components";
import AboutImg from "../../assets/About.png";

const About = () => {
  return (
    <Container>
      <h2>
        About <span>Us</span>
      </h2>
      <Wrapper>
        <ImgHolder>
          <Image src={AboutImg} alt="" />
        </ImgHolder>
        <Rightholder>
          <h1 style={{ marginBottom: "40px" }}>
            Empowering Convenient, Safe, and Reliable Gas Refills for Every Home
          </h1>
          <p style={{ marginBottom: "40px" }}>
            At RefillXpress, we’re redefining how households and businesses
            access cooking gas. Our goal is simple , to make gas refilling
            faster, safer, and more convenient for everyone.{" "}
          </p>
          <p style={{ marginBottom: "40px" }}>
            We connect customers with verified local gas vendors, ensuring every
            refill is transparent, affordable, and reliable. With just a few
            clicks, users can locate nearby suppliers, compare prices, and order
            refills from the comfort of their homes.
          </p>
          <p style={{ marginBottom: "40px" }}>
            For vendors, RefillXpress offers digital visibility, helping them
            reach more customers, manage orders efficiently, and grow their
            business.
          </p>
          <p style={{ marginBottom: "40px" }}>
            We believe in trust, transparency, and technology , three values
            that drive everything we do. Whether you’re a busy professional, a
            family at home, RefillXpress ensures your gas needs are handled
            seamlessly so you can focus on what truly matters.
          </p>
        </Rightholder>
      </Wrapper>
    </Container>
  );
};

export default About;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  font-weight: 40%;

  h2 {
    font-size: 70px;
    color: #2887db;
    span {
      color: #ff7f11;
    }
  }
`;

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImgHolder = styled.div`
  width: 48%;
  overflow: hidden;
  height: 800px;
`;

const Rightholder = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;

  h1 {
    width: 600px;
    font-size: 48px;

    p {
      margin-top: 50px;
    }
  }
`;

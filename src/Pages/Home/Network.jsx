import React from "react";
import styled, { css } from "styled-components";
import { HiArrowLongDown } from "react-icons/hi2";
import Hero from "../../assets/Hero1.png";
import network2 from "../../assets/network2.png";

function Network() {
  return (
    <Container>
      <Title>
        Join our growing network <HiArrowLongDown />
      </Title>
      <DataContainerWrapper>
        <DataContainer>
          <LeftContainer className="vendor-text">
            <ContainerTitle>
              Become a <span style={{ color: "#ff7f11" }}>Vendor</span>
            </ContainerTitle>
            <Description>
              Get more orders, more visibility, and more control. RefillXpress
              connects you as a gas supplier to thousands of customers, helping
              you manage orders seamlessly and grow your brand faster. Join
              today and take your sales to the next level.
            </Description>
            <ContainerButton>Partner with us</ContainerButton>
          </LeftContainer>
          <RightContainer className="vendor-image">
            <img src={Hero} alt="Vendor illustration" />
          </RightContainer>
        </DataContainer>

        <DataContainer1>
          <LeftContainer>
            <ContainerTitle>
              Earn with <span style={{ color: "#ff7f11" }}>RefillXpress</span>
            </ContainerTitle>
            <Description>
              Turn your passion into profit with RefillXpress. Whether you're a
              vendor, or delivery partner, our platform helps you earn more by
              connecting you daily with customers in need of gas refill
            </Description>
            <ContainerButton>Partner with us</ContainerButton>
          </LeftContainer>
          <RightContainer>
            <img src={network2} alt="Delivery partner illustration" />
          </RightContainer>
        </DataContainer1>
      </DataContainerWrapper>
    </Container>
  );
}

export default Network;

const Container = styled.div`
  width: 100%;
  min-height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  gap: 50px;
`;
const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  color: #c7c7c7;

  @media (max-width: 768px) {
    font-size: 28px;
    text-align: center;
  }
`;
const DataContainerWrapper = styled.div`
  width: 85%;
  max-width: 1200px;
  min-height: max-content;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const DataContainerBase = css`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 992px) {
    flex-direction: column;
    min-height: max-content;
  }
`;

const DataContainer = styled.div`
  ${DataContainerBase}
  flex-direction: row;
`;

const DataContainer1 = styled.div`
  ${DataContainerBase}
  flex-direction: row-reverse;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  @media (max-width: 992px) {
    width: 100%;
    text-align: center;
    align-items: center;
    order: 2;
  }
`;

const ContainerTitle = styled.h4`
  font-size: 28px;
  font-weight: 600;
  color: #2887db;

  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 183%;
  width: 90%;

  @media (max-width: 992px) {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
`;

const ContainerButton = styled.button`
  width: 160px;
  height: 50px;
  border-radius: 10px;
  background-color: #ff7f11;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 480px) {
    width: 140px;
    height: 45px;
    font-size: 14px;
  }
`;
const RightContainer = styled.div`
  width: 45%;
  height: 100%;
  min-height: 350px;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 992px) {
    width: 100%;
    height: 300px;
    margin-bottom: 30px;
    order: 1;
  }
  @media (max-width: 480px) {
    height: 250px;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

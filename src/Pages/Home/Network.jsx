import React from "react";
import { GoContainer } from "react-icons/go";
import styled from "styled-components";
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
          <LeftContainer>
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
          <RightContainer>
            <img src={Hero} alt="" />
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
            <img src={network2} alt="" />
          </RightContainer>
        </DataContainer1>
      </DataContainerWrapper>
    </Container>
  );
}

export default Network;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 30px;
  gap: 50px;
`;
const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  color: #c7c7c7;
`;
const DataContainerWrapper = styled.div`
  width: 85%;
  height: 80%;
  min-height: max-content;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const DataContainer = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  flex-direction: row;
  justify-content: space-betweent;
`;
const DataContainer1 = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;
const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`;

const ContainerTitle = styled.h4`
  font-size: 28px;
  font-weight: 600;
  color: #2887db;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 183%;
  width: 90%;
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
`;
const RightContainer = styled.div`
  width: 45%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;

  &img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

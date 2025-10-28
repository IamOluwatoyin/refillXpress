import React from "react";
import styled from "styled-components";
import vector from "../assets/Vector (1).png";

const ContantUs = () => {
  return (
    <Container>
      <Wrapper>
        <MailBox>
          <h3>
            <img src={vector} alt="" />{" "}
            <span> Subscribe to our newsletter</span>
          </h3>
          <p>
            Get the latest updates, news, and special offers delivered to your
            inbox.
          </p>
        </MailBox>
        <SubBox>
          <Box>
            <input type="text" placeholder="Email Address" />
            <button>Subscribe</button>
          </Box>
          <Text>
            By subscribing you agree to our <span>Terms & Conditions</span>
          </Text>
        </SubBox>
      </Wrapper>
    </Container>
  );
};

export default ContantUs;

const Container = styled.div`
  width: 100%;
  height: 25vh;
  background-color: #f5f8fc;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 90%;
  margin-top: 45px;
  display: flex;
  justify-content: space-between;

  span {
    color: #ff7f11;
  }
  p {
    margin-top: 15px;
  }
`;

const MailBox = styled.div``;

const SubBox = styled.div``;

const Box = styled.div`
  input {
    width: 300px;
    height: 45px;
    border: none;
    outline: none;
    padding: 15px;
    font-size: 15px;
  }

  button {
    width: 120px;
    height: 45px;
    color: #fff;
    background-color: #ff7f11;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
`;

const Text = styled.div`
  margin-top: 10px;
`;

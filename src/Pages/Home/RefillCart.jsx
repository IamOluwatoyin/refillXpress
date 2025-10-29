import React from "react";
import styled from "styled-components";
import badge from "../../assets/badge.png";
import clock from "../../assets/clock.png";
import table from "../../assets/table.png";
const RefillCart = () => {
  return (
    <Container>
      <Wrapper>
        <h3>
          Why Choose <span>RefillXpress?</span>
        </h3>

        <p>
          Experience the most convenient way to order your gas refill with our
          platform designed for both customers and vendors
        </p>
        <CardHolder>
          <Card1>
            <img src={badge} alt="" />
            <h4>Verified Vendors</h4>
            <p>
              All vendors are thoroughly verified and certified for safety and
              reliability
            </p>
          </Card1>
          <Card2>
            <img src={clock} alt="" />
            <h4>Fast Deliverys</h4>
            <p>
              Get your gas cylinder delivered quickly and convenienty because We
              value your time.
            </p>
          </Card2>
          <Card3>
            <img src={table} alt="" />
            <h4>Best Pricing</h4>
            <p>Competitive pricing with transparent rates. No hiden charges</p>
          </Card3>
        </CardHolder>
      </Wrapper>
    </Container>
  );
};

export default RefillCart;

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h3 {
    color: #2887db;
    margin-top: 30px;

    span {
      color: #ff7f11;
    }
  }

  p {
    width: 650px;
    text-align: center;
    margin-top: 30px;
  }
`;

const CardHolder = styled.div`
  width: 93%;
  height: 200px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const Card1 = styled.div`
  width: 422px;
  height: 237px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-top: 20px;

  p {
    width: 85%;
    text-align: start;
    margin-bottom: 100px;
  }

  h4 {
    margin-top: 20px;
  }
`;
const Card2 = styled.div`
  width: 422px;
  height: 237px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-top: 20px;
  p {
    width: 85%;
    text-align: start;
    margin-bottom: 20px;
  }

  h4 {
    margin-top: 20px;
  }
`;
const Card3 = styled.div`
  width: 422px;
  height: 237px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-top: 20px;
  p {
    width: 85%;
    text-align: start;
  }

  h4 {
    margin-top: 20px;
  }
`;

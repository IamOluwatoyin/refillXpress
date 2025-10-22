import React from "react";
import styled from "styled-components";
import badge from "../../assets/badge.png";
import clock from "../../assets/clock.png";
import table_badge from "../../assets/tabler_badge.png";
const CartRefill = () => {
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
            <img src={table_badge} alt="" />
            <h4>Best Pricing</h4>
            <p>Competitive pricing with transparent rates. No hiden charges</p>
          </Card3>
        </CardHolder>
      </Wrapper>
    </Container>
  );
};

export default CartRefill;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h3 {
    color: #2887db;
    span {
      color: #ff7f11;
    }
  }

  p {
    width: 650px;
    text-align: center;
  }
`;

const CardHolder = styled.div`
  width: 93%;
  height: 240px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const Card1 = styled.div`
  width: 422px;
  height: 237px;
  background-color: pink;
  padding: 10px;
  /* margin-top: 10px; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-top: 40px;
  p {
    width: 85%;
    text-align: start;
    margin-bottom: 20px;
  }
`;
const Card2 = styled.div`
  width: 422px;
  height: 237px;
  background-color: green;
  padding: 10px;
  /* margin-top: 10px; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-top: 40px;
  p {
    width: 85%;
    text-align: start;
  }
`;
const Card3 = styled.div`
  width: 422px;
  height: 237px;
  background-color: orange;
  padding: 10px;
  padding-top: 40px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  p {
    width: 85%;
    text-align: start;
    padding-top: 10px;
  }
`;

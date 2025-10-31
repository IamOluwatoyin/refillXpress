import styled from "styled-components";
import phone from "../../assets/phone.png";
import search from "../../assets/search.png";
import truck from "../../assets/truck.png";
import check from "../../assets/check.png";

const CartGas = () => {
  return (
    <Container id="how">
      <Card>HOW IT WORKS</Card>
      <h3>
        Get Your Gas in <span>simple 4 steps</span>
      </h3>
      <p className="first">
        Ordering gas has never been this easier follow these simple steps and
        enjoy hassle - free delivery.
      </p>
      <BallHolder>
        <Ball1>01</Ball1>
        <Ball1>02</Ball1>
        <Ball1>03</Ball1>
        <Ball1>04</Ball1>
      </BallHolder>
      <CardHolder>
        <Cards>
          <Subcard>
            <img src={phone} alt="" />
          </Subcard>
          <h4>Register</h4>
          <p>
            Visit the webapp and create your account in less than 2 miniutes
          </p>
        </Cards>
        <Cards>
          <Subcard>
            <img src={truck} alt="" />
          </Subcard>
          <h4>Find Vendors</h4>
          <p>Browse verified vendors in you area and compare prices</p>
        </Cards>
        <Cards>
          <Subcard>
            <img src={check} alt="" />
          </Subcard>
          <h4>Place Order</h4>
          <p>select you gas cylinder type and quantiy</p>
        </Cards>
        <Cards>
          <Subcard>
            <img src={search} alt="" />
          </Subcard>
          <h4>Get Delivered</h4>
          <p>
            Sit back and relax. Your gas will be delivered at your door step
          </p>
        </Cards>
      </CardHolder>
    </Container>
  );
};

export default CartGas;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f8fc;
  display: flex;
  align-items: center;
  flex-direction: column;

  h3 {
    color: #2887db;
    margin-top: 30px;
    font-size: 35px;
    span {
      color: #ff7f11;
    }
  }

  .first {
    margin-top: 30px;
  }
`;

const Card = styled.div`
  width: 15%;
  height: 10%;
  background-color: #ff7f111a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7f11;
  border-radius: 20px;
  margin-top: 40px;
`;

const BallHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  border-bottom: 2px solid #808080;
`;

const Ball1 = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: 4px solid blue;
  font-size: 40px;
  color: blue;
  margin-bottom: 20px;
`;

const CardHolder = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  padding-top: 35px;
`;

const Cards = styled.div`
  width: 18%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;

  h4 {
    text-align: center;
    margin-top: 15px;
    font-size: 20px;
  }

  p {
    text-align: center;
    margin-top: 15px;
    font-size: 17px;
    color: #808080;
  }
`;
const Subcard = styled.div`
  width: 105px;
  height: 105px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

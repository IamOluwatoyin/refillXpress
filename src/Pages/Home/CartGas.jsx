import styled from "styled-components";
import phone from "../../assets/phone.png";
import search from "../../assets/search.png";
import truck from "../../assets/truck.png";
import check from "../../assets/check.png";

const CartGas = () => {
  return (
    <Container>
      <Card>HOW IT WORKS</Card>
      <h3>
        Get Your Gas in <span>simple 4 steps</span>
      </h3>
      <p>
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
          <img src={phone} alt="" />
          {/* <h4>Register</h4> */}
          {/* <p>
            Visit the webapp and create your account in less than 2 miniutes
          </p> */}
        </Cards>
        <Cards>
          <img src={search} alt="" />
        </Cards>
        <Cards>
          <img src={check} alt="" />
        </Cards>
        <Cards>
          <img src={truck} alt="" />
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

  p {
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
  margin-top: 25px;
`;

const BallHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
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
`;

const CardHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
  padding-top: 35px;
`;

const Cards = styled.div`
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
`;

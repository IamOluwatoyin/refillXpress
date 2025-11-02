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
        Ordering gas has never been this easier, follow these simple steps and
        enjoy hassle-free delivery.
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
            <img src={phone} alt="Register icon" />
          </Subcard>
          <h4>Register</h4>
          <p>
            Visit the webapp and create your account in less than 2 miniutes
          </p>
        </Cards>
        <Cards>
          <Subcard>
            <img src={truck} alt="Find Vendors icon" />
          </Subcard>
          <h4>Find Vendors</h4>
          <p>Browse verified vendors in you area and compare prices</p>
        </Cards>
        <Cards>
          <Subcard>
            <img src={check} alt="Place Order icon" />
          </Subcard>
          <h4>Place Order</h4>
          <p>select you gas cylinder type and quantiy</p>
        </Cards>
        <Cards>
          <Subcard>
            <img src={search} alt="Get Delivered icon" />
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
  padding: 40px 20px;
  background-color: #f5f8fc;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  h3 {
    color: #2887db;
    margin-top: 30px;
    font-size: 35px;

    span {
      color: #ff7f11;
    }

    @media (max-width: 768px) {
      font-size: 28px;
    }
    @media (max-width: 480px) {
      font-size: 22px;
    }
  }

  .first {
    margin-top: 30px;
    max-width: 600px;
  }
`;

const Card = styled.div`
  width: 15%;
  min-width: 150px;
  height: 10%;
  min-height: 40px;
  background-color: #ff7f111a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7f11;
  border-radius: 20px;
  margin-top: 40px;

  @media (max-width: 480px) {
    width: 40%;
    min-width: 120px;
    font-size: 12px;
  }
`;

const BallHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  border-bottom: 2px solid #808080;
  max-width: 1200px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 10px;
  }
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

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
    margin-bottom: 15px;
    border: 3px solid blue;
  }
`;

const CardHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  padding-top: 35px;
  max-width: 1200px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    padding: 20px;
  }
`;

const Cards = styled.div`
  width: 18%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    width: 45%;
  }
  @media (max-width: 550px) {
    width: 80%;
  }

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

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

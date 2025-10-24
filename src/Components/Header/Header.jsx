import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { useState } from "react";

const Header = () => {
  const [loginDrop, setDrop] = useState(false);
  const [getStated, setGetStated] = useState(false);
  console.log(loginDrop);
  const handleLoginDrop = () => {
    setGetStated(false);
    setDrop(!loginDrop);
  };

  console.log(getStated);
  const handleGetstated = () => {
    setDrop(false);
    setGetStated(!getStated);
  };
  return (
    <Container>
      <ContainerWrapper>
        <LogoHolder>
          <ImgHolder>
            <img src={logo} alt="logo" />
          </ImgHolder>
          <h3>
            Refill <span>Xpress</span>
          </h3>
        </LogoHolder>
        <MidContainer>
          <ul>
            <li>Home</li>
            <li>How it works</li>
            <li>Contant Us</li>
          </ul>
        </MidContainer>
        <ButtonHolder>
          <button className="box1" onClick={handleLoginDrop}>
            Sign in
          </button>
          <button className="box2" onClick={handleGetstated}>
            Get Stated
          </button>
          {loginDrop && (
            <div className="drop">
              <button className="customer_button">As Customer</button>
              <button className="vendor_button">As Vendor</button>
            </div>
          )}

          {getStated && (
            <div className="drop2">
              <button className="customer_button1">As Customer</button>
              <button className="vendor_button1">As Vendor</button>
            </div>
          )}
        </ButtonHolder>
      </ContainerWrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ContainerWrapper = styled.div`
  width: 96%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h3 {
    color: #2887db;
    span {
      color: #ff7f11;
    }
  }
`;

const MidContainer = styled.div`
  ul {
    display: flex;
    list-style: none;
    gap: 35px;
  }
`;

const ButtonHolder = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .drop {
    width: 150px;
    height: 120px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    right: 150px;
    top: 85px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
  }
  .drop2 {
    width: 150px;
    height: 120px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    right: 15px;
    top: 85px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
  }

  .box1 {
    width: 90px;
    height: 50px;
    border: 1px solid #2887db;
    color: #2887db;
    border-radius: 8px;
    cursor: pointer;
  }

  .box1:hover {
    color: white;
    background-color: #2887db;
  }
  .box2 {
    width: 130px;
    height: 50px;
    background-color: #ff7f11;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .box2:hover {
    background-color: #ee750cc0;
  }

  .customer_button {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
  .customer_button:hover {
    background-color: #ff7f11;
    color: white;
  }
  .vendor_button {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
  }
  .vendor_button:hover {
    cursor: pointer;
    background-color: #ff7f11;
    color: white;
  }
  .customer_button1 {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
  .customer_button1:hover {
    background-color: #ff7f11;
    color: white;
  }
  .vendor_button1 {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
  }
  .vendor_button1:hover {
    cursor: pointer;
    background-color: #ff7f11;
    color: white;
  }
`;

const ImgHolder = styled.div``;

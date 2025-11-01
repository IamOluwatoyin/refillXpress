import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-scroll";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const Header = () => {
  const [loginDrop, setDrop] = useState(false);
  const [getStated, setGetStated] = useState(false);
  const nav = useNavigate();
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

  const [show, setShow] = useState(false);

  const ToggleSow = () => {
    setShow(!show);
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
            <SmoothLink to="home" smooth={true} duration={600}>
              Home
            </SmoothLink>
            <SmoothLink to="how" smooth={true} duration={600}>
              How it works
            </SmoothLink>
            <SmoothLink to="contact" smooth={true} duration={600}>
              Contact Us
            </SmoothLink>
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
              <button
                className="vendor_button"
                onClick={() => nav("/vendor-login")}
              >
                As Vendor
              </button>
              <button
                className="vendor_button"
                onClick={() => nav("/riderlogin")}
              >
                As Rider
              </button>
            </div>
          )}

          {getStated && (
            <div className="drop2">
              <button className="customer_button1">As Customer</button>
              <button
                className="vendor_button1"
                onClick={() => nav("/vendor-signup")}
              >
                As Vendor
              </button>
              <button
                className="vendor_button1"
                onClick={() => nav("/ridersignup")}
              >
                As Rider
              </button>
            </div>
          )}
        </ButtonHolder>

        <Iconholder>
          {show ? (
            <CgClose onClick={ToggleSow} size={25} />
          ) : (
            <BiMenu onClick={ToggleSow} size={25} />
          )}
        </Iconholder>

        {show ? (
          <Dropdownholder>
            <Dropdown>
              <SmoothLink2 to="home" smooth={true} duration={600}>
                Home
              </SmoothLink2>
              <SmoothLink2 to="how" smooth={true} duration={600}>
                How it works
              </SmoothLink2>
              <SmoothLink2 to="contact" smooth={true} duration={600}>
                Contact Us
              </SmoothLink2>
              <button className="box3" onClick={handleLoginDrop}>
                Sign in
              </button>
              <button className="box4" onClick={handleGetstated}>
                Get Stated
              </button>
            </Dropdown>
          </Dropdownholder>
        ) : null}
      </ContainerWrapper>
    </Container>
  );
};

export default Header;
const SmoothLink2 = styled(Link)`
  width: 100%;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  margin-bottom: 30px;
  &:hover {
    color: #2887db;
  }
`;
const Dropdown = styled.div`
  width: 28%;
  display: flex;
  align-content: center;
  /* justify-content: center; */
  flex-direction: column;
  height: 300px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 30px;

  .box3 {
    width: 100%;
    height: 50px;
    border: 1px solid #2887db;
    color: #2887db;
    border-radius: 8px;
    cursor: pointer;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .box3:hover {
    color: white;
    background-color: #2887db;
  }
  .box4 {
    width: 100%;
    height: 50px;
    background-color: #ff7f11;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .box4:hover {
    background-color: #ee750cc0;
  }
`;
const Dropdownholder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color: #00000075; */
  top: 70px;
  left: 0;
  display: none;
  justify-content: end;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const Iconholder = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
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

const SmoothLink = styled(Link)`
  &:hover {
    color: #2887db;
  }
`;

const MidContainer = styled.div`
  ul {
    display: flex;
    list-style: none;
    gap: 35px;
    cursor: pointer;

    li {
    }
  }

  @media (max-width: 768px) {
    display: none;
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
    background-color: #fff;
  }

  .box1:hover {
    color: white;
    background-color: #2887db;
  }
  .box2 {
    width: 130px;
    height: 50px;
    background-color: #ff7f11;
    color: white;
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
    background-color: white;
  }
  .customer_button:hover {
    color: #ff7f11;
  }
  .vendor_button {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: white;
  }
  .vendor_button:hover {
    cursor: pointer;
    color: #ff7f11;
  }
  .customer_button1 {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: white;
  }
  .customer_button1:hover {
    color: #ff7f11;
  }
  .vendor_button1 {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: white;
  }
  .vendor_button1:hover {
    cursor: pointer;
    color: #ff7f11;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const ImgHolder = styled.div``;

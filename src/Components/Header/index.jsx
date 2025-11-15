import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-scroll";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import logo from "../../assets/logo.svg";

const Header = () => {
  const [loginDrop, setDrop] = useState(false);
  const [getStated, setGetStated] = useState(false);
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [mobileLoginDrop, setMobileLoginDrop] = useState(false);
  const [mobileGetStatedDrop, setMobileGetStatedDrop] = useState(false);

  const handleLoginDrop = () => {
    setGetStated(false);
    setDrop(!loginDrop);
  };

  const handleGetstated = () => {
    setDrop(false);
    setGetStated(!getStated);
  };

  const ToggleSow = () => {
    setShow(!show);
    setDrop(false);
    setGetStated(false);
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  const handleMobileLoginDrop = () => {
    setMobileGetStatedDrop(false);
    setMobileLoginDrop(!mobileLoginDrop);
  };

  const handleMobileGetStated = () => {
    setMobileLoginDrop(false);
    setMobileGetStatedDrop(!mobileGetStatedDrop);
  };

  const handleMobileNavigation = (path) => {
    nav(path);
    setShow(false);
    setMobileLoginDrop(false);
    setMobileGetStatedDrop(false);
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
              <button
                onClick={() => nav("/userlogin")}
                className="customer_button"
              >
                As Customer
              </button>
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
              <button
                onClick={() => nav("/usersignup")}
                className="customer_button1"
              >
                As Customer
              </button>
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

        <Dropdownholder show={show}>
          <Dropdown show={show}>
            <SmoothLink2
              to="home"
              smooth={true}
              duration={600}
              onClick={handleLinkClick}
            >
              Home
            </SmoothLink2>
            <SmoothLink2
              to="how"
              smooth={true}
              duration={600}
              onClick={handleLinkClick}
            >
              How it works
            </SmoothLink2>
            <SmoothLink2
              to="contact"
              smooth={true}
              duration={600}
              onClick={handleLinkClick}
            >
              Contact Us
            </SmoothLink2>
            <button className="box3" onClick={handleMobileLoginDrop}>
              Sign in
            </button>
            {mobileLoginDrop && (
              <MobileDropdown>
                <button
                  className="mobile_customer_button"
                  onClick={() => handleMobileNavigation("/userlogin")}
                >
                  As Customer
                </button>
                <button
                  className="mobile_vendor_button"
                  onClick={() => handleMobileNavigation("/vendor-login")}
                >
                  As Vendor
                </button>
                <button
                  className="mobile_vendor_button"
                  onClick={() => handleMobileNavigation("/riderlogin")}
                >
                  As Rider
                </button>
              </MobileDropdown>
            )}
            <button className="box4" onClick={handleMobileGetStated}>
              Get Stated
            </button>
            {mobileGetStatedDrop && (
              <MobileDropdown>
                <button
                  className="mobile_customer_button"
                  onClick={() => handleMobileNavigation("/usersignup")}
                >
                  As Customer
                </button>
                <button
                  className="mobile_vendor_button"
                  onClick={() => handleMobileNavigation("/vendor-signup")}
                >
                  As Vendor
                </button>
                <button
                  className="mobile_vendor_button"
                  onClick={() => handleMobileNavigation("/ridersignup")}
                >
                  As Rider
                </button>
              </MobileDropdown>
            )}
          </Dropdown>
        </Dropdownholder>
      </ContainerWrapper>
    </Container>
  );
};

export default Header;

const MobileDropdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  padding: 10px 0;
  border-top: 1px solid #eee;

  .mobile_customer_button,
  .mobile_vendor_button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: #f7f7f7;
    font-size: 0.9rem;
    transition: all 0.2s;
    color: #333;
  }

  .mobile_customer_button:hover,
  .mobile_vendor_button:hover {
    color: #ff7f11;
    background-color: #fff;
  }
`;

const SmoothLink2 = styled(Link)`
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #2887db;
  }
`;

const Dropdown = styled.div`
  width: 75%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 30px;

  position: absolute;
  top: 0;
  right: 0;
  height: 100%;

  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.show &&
    `
    transform: translateX(0);
  `}

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
  position: fixed;
  width: 100%;
  height: calc(100vh - 5rem);
  top: 5rem;
  left: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 5;

  background-color: ${({ show }) => (show ? "#00000075" : "transparent")};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  pointer-events: ${({ show }) => (show ? "auto" : "none")};

  @media (min-width: 769px) {
    display: none;
  }
`;

const Iconholder = styled.div`
  display: none;
  cursor: pointer;
  z-index: 15;
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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
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
  cursor: pointer;
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
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonHolder = styled.div`
  width: auto;
  min-width: 230px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 15px;

  .drop {
    width: 150px;
    height: 120px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    right: 145px;
    top: 60px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  }
  .drop2 {
    width: 150px;
    height: 120px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  }

  .box1 {
    width: 90px;
    height: 45px;
    border: 1px solid #2887db;
    color: #2887db;
    border-radius: 8px;
    cursor: pointer;
    background-color: #fff;
    transition: all 0.2s;
  }

  .box1:hover {
    color: white;
    background-color: #2887db;
  }
  .box2 {
    width: 130px;
    height: 45px;
    background-color: #ff7f11;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .box2:hover {
    background-color: #ee750cc0;
  }

  .customer_button,
  .vendor_button,
  .customer_button1,
  .vendor_button1 {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: white;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  .customer_button:hover,
  .vendor_button:hover,
  .customer_button1:hover,
  .vendor_button1:hover {
    color: #ff7f11;
    background-color: #f7f7f7;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ImgHolder = styled.div``;

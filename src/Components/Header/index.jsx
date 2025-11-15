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

  const [mobileLoginDrop, setMobileLogin] = useState(false);
  const [mobileGetStartedDrop, setMobileGetStarted] = useState(false);

  const nav = useNavigate();
  const [show, setShow] = useState(false);

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
    setMobileLogin(false);
    setMobileGetStarted(false);
  };

  const handleLinkClick = () => {
    setShow(false);
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
            <SmoothLink to="home" smooth duration={600}>
              Home
            </SmoothLink>
            <SmoothLink to="how" smooth duration={600}>
              How it works
            </SmoothLink>
            <SmoothLink to="contact" smooth duration={600}>
              Contact Us
            </SmoothLink>
          </ul>
        </MidContainer>

        <ButtonHolder>
          <button className="box1" onClick={handleLoginDrop}>
            Sign in
          </button>
          <button className="box2" onClick={handleGetstated}>
            Get Started
          </button>

          {loginDrop && (
            <div className="drop">
              <button onClick={() => nav("/userlogin")}>As Customer</button>
              <button onClick={() => nav("/vendor-login")}>As Vendor</button>
              <button onClick={() => nav("/riderlogin")}>As Rider</button>
            </div>
          )}

          {getStated && (
            <div className="drop2">
              <button onClick={() => nav("/usersignup")}>As Customer</button>
              <button onClick={() => nav("/vendor-signup")}>As Vendor</button>
              <button onClick={() => nav("/ridersignup")}>As Rider</button>
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
              smooth
              duration={600}
              onClick={handleLinkClick}
            >
              Home
            </SmoothLink2>

            <SmoothLink2
              to="how"
              smooth
              duration={600}
              onClick={handleLinkClick}
            >
              How it works
            </SmoothLink2>

            <SmoothLink2
              to="contact"
              smooth
              duration={600}
              onClick={handleLinkClick}
            >
              Contact Us
            </SmoothLink2>

            <MobileBtn
              onClick={() => {
                setMobileLogin(!mobileLoginDrop);
                setMobileGetStarted(false);
              }}
            >
              Sign In
            </MobileBtn>

            {mobileLoginDrop && (
              <MobileDrop>
                <button onClick={() => nav("/userlogin")}>As Customer</button>
                <button onClick={() => nav("/vendor-login")}>As Vendor</button>
                <button onClick={() => nav("/riderlogin")}>As Rider</button>
              </MobileDrop>
            )}

            <MobileBtn
              onClick={() => {
                setMobileGetStarted(!mobileGetStartedDrop);
                setMobileLogin(false);
              }}
            >
              Get Started
            </MobileBtn>

            {mobileGetStartedDrop && (
              <MobileDrop>
                <button onClick={() => nav("/usersignup")}>As Customer</button>
                <button onClick={() => nav("/vendor-signup")}>As Vendor</button>
                <button onClick={() => nav("/ridersignup")}>As Rider</button>
              </MobileDrop>
            )}
          </Dropdown>
        </Dropdownholder>
      </ContainerWrapper>
    </Container>
  );
};

export default Header;

const SmoothLink2 = styled(Link)`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  color: #333;
`;

const MobileBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 45px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #2887db;
  background-color: white;
  color: #2887db;
  cursor: pointer;
`;

const MobileDrop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding-left: 10px;

  button {
    width: 100%;
    height: 40px;
    margin-top: 8px;
    background: #f4f4f4;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
`;

const Dropdown = styled.div`
  width: 75%;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  transform: translateX(100%);
  transition: 0.3s ease-in-out;

  ${(props) => props.show && "transform: translateX(0);"}
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
`;

const MidContainer = styled.div`
  ul {
    display: flex;
    gap: 35px;
    list-style: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  gap: 15px;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }

  .drop,
  .drop2 {
    width: 160px;
    background-color: white;
    padding: 12px;
    border-radius: 10px;
    position: absolute;
    top: 55px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 15px;
  }

  .box1 {
    width: 95px;
    height: 45px;
    border: 1px solid #2887db;
    color: #2887db;
    background: white;
    border-radius: 8px;
  }
  .box2 {
    width: 130px;
    height: 45px;
    background: #ff7f11;
    color: white;
    border-radius: 8px;
  }
`;

const ImgHolder = styled.div``;

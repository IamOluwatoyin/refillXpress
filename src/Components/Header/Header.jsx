import styled from "styled-components";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <Container>
      <ContainerWrapper>
        <LogoHolder>
          <imgHolder>
            <img src={logo} alt="logo" />
          </imgHolder>
          <h3>
            Refill <spam>Xpress</spam>
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
          <button className="box1"> Sign in</button>
          <button className="box2">Get Stated</button>
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
    spam {
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

  .box1 {
    width: 90px;
    height: 50px;
    border: 1px solid #2887db;
    color: #2887db;
    border-radius: 8px;
    cursor: pointer;
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
`;

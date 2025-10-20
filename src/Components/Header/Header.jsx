import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <ContainerWrapper>
        <LogoContainer></LogoContainer>
        <MiddleContainer></MiddleContainer>
        <ButtonContainer></ButtonContainer>
      </ContainerWrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 10vh;
  background-color: green;
`;

const ContainerWrapper = styled.div``;

const LogoContainer = styled.div``;

const MiddleContainer = styled.div``;

const ButtonContainer = styled.div``;

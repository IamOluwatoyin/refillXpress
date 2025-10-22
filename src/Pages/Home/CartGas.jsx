import styled from "styled-components";

const CartGas = () => {
  return (
    <Container>
      <Wrapper>
        <Card>HOW IT WORKS</Card>
      </Wrapper>
    </Container>
  );
};

export default CartGas;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f8fc;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const Card = styled.div`
  width: 15%;
  height: 10%;
  background-color: #ff7f111a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7f11;
`;

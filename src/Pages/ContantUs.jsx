import React from "react";
import styled from "styled-components";

const ContantUs = () => {
  return (
    <Container>
      <Wrapper>
        <h1>
          Contant <span>Us</span>
        </h1>
        <h3>
          Contact us on <span>+23481665694 & +2340760994040</span>(9 AM – 9PM
          except Sundays ) or email us at{" "}
          <span> customerservice@refillXpress.ng</span>
        </h3>
      </Wrapper>
    </Container>
  );
};

export default ContantUs;

const Container = styled.div`
  width: 100%;
  height: 25vh;
  background-color: #f5f8fc;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 90%;

  h1 {
    color: #2887db;
    margin-top: 35px;
    font-size: 45px;

    span {
      color: #ff7f11;
    }
  }

  h3 {
    margin-top: 35px;
    span {
      color: #ff7f11;
    }
  }
`;

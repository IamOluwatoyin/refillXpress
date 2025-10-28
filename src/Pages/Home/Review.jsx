import React from "react";
import styled from "styled-components";
import quotationmark from "../../assets/quotation-mark.png";
import Ellipse from "../../assets/Ellipse 4.png";
import Ellipse1 from "../../assets/Ellipse1.png";
import Ellipse2 from "../../assets/Ellipse 2.png";
import Ellipse3 from "../../assets/Ellipse 3.png";

const Review = () => {
  return (
    <Container>
      <Text>
        <h2>
          Customer <span> Reviews</span>
        </h2>
      </Text>
      <Text2>
        <h3>A selection review from our delighted customers</h3>
      </Text2>
      <Wrapper>
        <CardHolder>
          <Card>
            <img src={quotationmark} alt="" />
            <p>
              Super convenient! RefillXpress made gas refilling so easy no more
              waiting or endless phone calls. I just order and it arrives fast!
            </p>
            <div className="imgName_holder">
              <img src={Ellipse} alt="" className="img_1" />
              <div className="text">
                <h4>Name</h4>
                <p className="title">title</p>
                <nav>⭐⭐⭐⭐</nav>
              </div>
            </div>
          </Card>
          <Card>
            {" "}
            <img src={quotationmark} alt="" />
            <p>
              Reliable service every time. I love how I can see verified vendors
              and transparent prices. I finally trust my gas deliveries again!
            </p>
            <div className="imgName_holder">
              <img src={Ellipse1} alt="" className="img_1" />
              <div className="text">
                <h4>Name</h4>
                <p className="title">title</p>
                <nav>⭐⭐⭐⭐</nav>
              </div>
            </div>
          </Card>
          <Card>
            <img src={quotationmark} alt="" />
            <p>
              A real time-saver! RefillXpress has changed how I refill gas at
              home. It’s quick, safe, and stress-free highly recommend!
            </p>
            <div className="imgName_holder">
              <img src={Ellipse2} alt="" className="img_1" />
              <div className="text">
                <h4>Name</h4>
                <p className="title">title</p>
                <nav>⭐⭐⭐⭐</nav>
              </div>
            </div>
          </Card>
          <Card>
            <img src={quotationmark} alt="" />
            <p>
              Super convenient! RefillXpress made gas refilling so easy no more
              waiting or endless phone calls. I just order and it arrives fast!
            </p>
            <div className="imgName_holder">
              <img src={Ellipse3} alt="" className="img_1" />
              <div className="text">
                <h4>Name</h4>
                <p className="title">title</p>
                <nav>⭐⭐⭐⭐</nav>
              </div>
            </div>
          </Card>
        </CardHolder>
      </Wrapper>
    </Container>
  );
};

export default Review;

const Container = styled.div`
  width: 100%;
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h2 {
    font-size: 48px;
    margin-top: 20px;
  }
  span {
    color: #ff7f11;
  }
`;

const Text2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  h3 {
    font-size: 36px;
    color: #808080;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CardHolder = styled.div`
  width: 93%;
  height: 240px;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px;
`;

const Card = styled.div`
  width: 422px;
  height: 237px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #f2f6f5;

  p {
    margin-top: 20px;
    font-size: 20px;
    color: #808080;
    margin-left: 10px;
  }

  .imgName_holder {
    margin-top: 8px;
    display: flex;
    gap: 8px;
    width: 100%;
    height: max-content;

    .title {
      margin: 0;
    }

    .img_1 {
      margin-left: 10px;
    }
  }
`;

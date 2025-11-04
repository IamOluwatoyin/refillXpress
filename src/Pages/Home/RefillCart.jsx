import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import badge from "../../assets/badge.png";
import clock from "../../assets/clock.png";
import table from "../../assets/table.png";

const RefillCart = () => {
  const cards = [
    {
      img: badge,
      title: "Verified Vendors",
      text: "All vendors are thoroughly verified and certified for safety and reliability.",
    },
    {
      img: clock,
      title: "Fast Deliveries",
      text: "Get your gas cylinder delivered quickly and conveniently because we value your time.",
    },
    {
      img: table,
      title: "Best Pricing",
      text: "Competitive pricing with transparent rates. No hidden charges.",
    },
  ];

  return (
    <Container>
      <Wrapper>
        <h3>
          Why Choose <span>RefillXpress?</span>
        </h3>
        <p>
          Experience the most convenient way to order your gas refill with our
          platform designed for both customers and vendors.
        </p>

        <CardHolder className="desktop">
          {cards.map((card, i) => (
            <Card key={i}>
              <img src={card.img} alt={card.title} />
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </Card>
          ))}
        </CardHolder>

        <Carousel className="mobile">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
          >
            {cards.map((card, i) => (
              <SwiperSlide key={i}>
                <Card>
                  <img src={card.img} alt={card.title} />
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Carousel>
      </Wrapper>
    </Container>
  );
};

export default RefillCart;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h3 {
    color: #2887db;
    margin-top: 30px;
    span {
      color: #ff7f11;
    }
  }

  p {
    width: 650px;
    text-align: center;
    margin-top: 20px;

    @media (max-width: 768px) {
      width: 90%;
    }
  }
`;

const CardHolder = styled.div`
  width: 93%;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Carousel = styled.div`
  display: none;
  width: 100%;
  margin-top: 20px;

  .swiper {
    width: 100%;
    padding: 20px;
  }

  @media (max-width: 768px) {
    display: block;
  }

  .swiper-pagination-bullet {
    display: none;
    background-color: #2887db;
    opacity: 0.6;
  }

  .swiper-pagination-bullet-active {
    background-color: #ff7f11;
    opacity: 1;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  height: 240px;
  border-radius: 10px;
  padding: 20px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  h4 {
    margin-top: 20px;
  }

  p {
    margin-top: 10px;
    width: 90%;
    text-align: start;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

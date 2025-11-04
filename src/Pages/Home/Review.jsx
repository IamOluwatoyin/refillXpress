import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import quotationmark from "../../assets/quotation-mark.png";
import Ellipse from "../../assets/Ellipse 4.png";
import Ellipse1 from "../../assets/Ellipse1.png";
import Ellipse2 from "../../assets/Ellipse 2.png";
import Ellipse3 from "../../assets/Ellipse 3.png";

const Review = () => {
  const reviews = [
    {
      img: Ellipse,
      text: "Super convenient! RefillXpress made gas refilling so easy — no more waiting or endless phone calls. I just order and it arrives fast!",
      name: "Name",
      title: "Customer",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      img: Ellipse1,
      text: "Reliable service every time. I love how I can see verified vendors and transparent prices. I finally trust my gas deliveries again!",
      name: "Name",
      title: "Customer",
      rating: "⭐⭐⭐⭐",
    },
    {
      img: Ellipse2,
      text: "A real time-saver! RefillXpress has changed how I refill gas at home. It’s quick, safe, and stress-free — highly recommend!",
      name: "Name",
      title: "Customer",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      img: Ellipse3,
      text: "Amazing experience every time! I order gas and it arrives quickly with reliable vendors.",
      name: "Name",
      title: "Customer",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <Container>
      <Text>
        <h2>
          Customer <span>Reviews</span>
        </h2>
      </Text>

      <Text2>
        <h3>A selection of reviews from our delighted customers</h3>
      </Text2>

      <CarouselWrapper>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          grabCursor={true}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <Card>
                <img src={quotationmark} alt="quote" className="quote" />
                <p>{review.text}</p>
                <div className="imgName_holder">
                  <img src={review.img} alt="Customer" className="img_1" />
                  <div className="text">
                    <h4>{review.name}</h4>
                    <p className="title">{review.title}</p>
                    <nav>{review.rating}</nav>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselWrapper>
    </Container>
  );
};

export default Review;

const Container = styled.div`
  width: 100%;
  padding: 60px 0;
  background-color: #fff;
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h2 {
    font-size: 48px;
    margin-top: 20px;
    color: #222;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  span {
    color: #ff7f11;
  }
`;

const Text2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  h3 {
    font-size: 20px;
    color: #808080;
    text-align: center;
    max-width: 600px;

    @media (max-width: 768px) {
      font-size: 16px;
      width: 90%;
    }
  }
`;

const CarouselWrapper = styled.div`
  width: 90%;
  margin: 60px auto 0;

  .swiper {
    padding-bottom: 50px;
  }

  .swiper-pagination-bullet {
    background-color: #ff7f11;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
`;

const Card = styled.div`
  background-color: #f5f8fc;
  border-radius: 10px;
  padding: 25px;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 4px 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 250px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
  }

  .quote {
    width: 30px;
    height: 30px;
  }

  p {
    font-size: 16px;
    color: #555;
    margin-top: 15px;
    line-height: 1.6;
  }

  .imgName_holder {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 12px;

    .img_1 {
      width: 50px;
      height: 50px;
    }

    .text {
      h4 {
        margin: 0;
        font-size: 16px;
        color: #222;
      }

      .title {
        color: #777;
        font-size: 14px;
        margin: 0;
      }

      nav {
        color: #ff7f11;
        font-size: 14px;
      }
    }
  }
`;

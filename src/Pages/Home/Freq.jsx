import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Freq = () => {
  const questions = [
    {
      text: "How can I become a vendor?",
      title:
        "Register and select to be a vendor. Fill the form and we'll get back to you for further action.",
    },
    {
      text: "How easy can I buy gas?",
      title:
        "It is very easy. Login into your dashboard, choose any vendor you wish to buy from, select the volume and pay.",
    },
    {
      text: "What are your delivery times?",
      title:
        "Delivery times vary based on the vendor and your location, but most orders are fulfilled within 1-3 hours.",
    },
    {
      text: "Is it safe to order gas online?",
      title:
        "Yes, absolutely. We only partner with verified and certified gas vendors to ensure safety and quality.",
    },
  ];

  const [dropDown, setDropDown] = useState(null);

  const handleDrop = (index) => {
    setDropDown(dropDown === index ? null : index);
  };

  return (
    <MainBody>
      <FaqText>
        Frequently Asked
        <span style={{ color: " #ff7f11" }}> Question</span>
      </FaqText>
      <FaqSubText>
        <p>Giving you the best of experience!</p>
        <p>Our users are so dear to us; your concerns are our concerns.</p>
      </FaqSubText>
      <CardWrapper>
        {questions.map((item, index) => (
          <QuestionsCard onClick={() => handleDrop(index)} key={index}>
            <QuestionCard>
              <QuestionText>{item.text}</QuestionText>
              {dropDown === index ? (
                <IoIosArrowUp style={{ color: "white", fontSize: "25px" }} />
              ) : (
                <IoIosArrowDown style={{ color: "white", fontSize: "25px" }} />
              )}
            </QuestionCard>
            {dropDown === index && <AnswerCard>{item.title}</AnswerCard>}
          </QuestionsCard>
        ))}
      </CardWrapper>
    </MainBody>
  );
};

export default Freq;

const MainBody = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  gap: 30px;
  align-items: center;
  flex-direction: column;
  background-color: #ff7f111a;
  padding: 60px 20px 40px;
  margin-top: 70px;
`;

const CardWrapper = styled.div`
  width: 40%;
  max-width: 700px;
  height: auto;
  min-height: max-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 85%;
  }
`;

const FaqText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  color: #2887db;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const FaqSubText = styled.h4`
  font-size: 25px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;

  p {
    margin: 5px 0;
  }
  @media (max-width: 480px) {
    font-size: 18px;
    p {
      max-width: 90%;
    }
  }
`;

const QuestionsCard = styled.div`
  width: 100%;
  height: auto;
  min-height: max-content;
  background-color: #ff7f11;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
`;

const QuestionCard = styled.div`
  width: 100%;
  min-height: 90px;
  background-color: #ff7f11;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @media (max-width: 480px) {
    min-height: 70px;
    padding: 15px 20px;
  }
`;

const AnswerCard = styled.div`
  width: 100%;
  height: auto;
  min-height: max-content;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px 28px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15px 25px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const QuestionText = styled.h4`
  font-size: 24px;
  font-weight: 360;
  color: white;
  margin-right: 15px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

const Freq = () => {
  const questions = [
    {
      text: "How can i become a vendor ?",
      title:
        "Register and select to be a vendor. Fill the form and we'll get back to you for further action.",
    },
    {
      text: "How easy can i buy gas ?",
      title:
        "It is very easy. Login into your dashboard choose any vendor you wish to buy from, select the volume and pay.",
    },
    {
      text: "How can i become a vendor ?",
      title:
        "Register and select to be a vendor. Fill the form and we'll get back to you for further action.",
    },
    {
      text: "How easy can i buy gas ?",
      title:
        "It is very easy. Login into your dashboard choose any vendor you wish to buy from, select the volume and pay.",
    },
  ];

  const [dropDown, setDropDown] = useState(null);
  console.log(dropDown);
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
        <p>Giving you the best of exprience!</p>
        <p> Our user are so dear to us, your concerns is our concerns.</p>
      </FaqSubText>
      <CardWrapper>
        {questions.map((item, index) => (
          <QuestionsCard onClick={() => handleDrop(index)} key={index}>
            <QuestionCard>
              <QuestionText>{item.text}</QuestionText>
              <IoIosArrowDown style={{ color: "white", fontSize: "25px" }} />
            </QuestionCard>
            {dropDown === index ? <AnswerCard>{item.title}</AnswerCard> : null}
          </QuestionsCard>
        ))}
      </CardWrapper>
    </MainBody>
  );
};

export default Freq;

const MainBody = styled.div`
  width: 100%;
  height: 80vh;
  min-height: max-content;
  display: flex;
  gap: 30px;
  align-items: center;
  flex-direction: column;
  background-color: #ff7f111a;
  padding-top: 60px;
  padding-bottom: 20px;
  margin-top: 70px;
`;

const CardWrapper = styled.div`
  width: 40%;
  height: 70%;
  min-height: max-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;
const FaqText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  color: #2887db;
`;
const FaqSubText = styled.h4`
  font-size: 25px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const QuestionsCard = styled.div`
  width: 100%;
  height: 90px;
  min-height: max-content;
  background-color: #ff7f11;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const QuestionCard = styled.div`
  width: 100%;
  height: 90px;
  background-color: #ff7f11;
  padding-inline: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const AnswerCard = styled.div`
  width: 100%;
  height: 68px;
  min-height: max-content;
  background-color: #eee;
  padding-inline: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionText = styled.h4`
  font-size: 40px;
  font-weight: 700;
  color: white;
`;

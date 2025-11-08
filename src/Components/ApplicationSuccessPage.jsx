import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  max-width: 28rem;
  width: 100%;
  background-color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  transform: translateY(0);
`;

const CheckIconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  background-color: #ecfdf5;
  margin: 0 auto 1.5rem;
`;

const CheckIcon = styled(FaCheckCircle)`
  color: #10b981;
  width: 2.5rem;
  height: 2.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const WhatNextBox = styled.div`
  background-color: #f9fafb;
  border-radius: 0.25rem;
  padding: 1.5rem;
  text-align: left;
`;

const WhatNextTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const WhatNextList = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0;
`;

const WhatNextListItem = styled.li`
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const ApplicationIdWrapper = styled.div`
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ApplicationId = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const ContinueButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #059669;
  }
`;

const ApplicationSuccessModal = ({
  applicationId = "RDR-FNSL9GD2K",
  onComplete,
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <ModalBackdrop onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CheckIconWrapper>
          <CheckIcon />
        </CheckIconWrapper>

        <Title>Application Submitted! 🎉</Title>

        <Message>
          Thank you for applying to become a rider. We've received your
          application and will review it within **24-48 hours**. You'll receive
          an email notification once your application has been processed.
        </Message>

        <WhatNextBox>
          <WhatNextTitle>What's Next?</WhatNextTitle>
          <WhatNextList>
            <WhatNextListItem>Background verification check</WhatNextListItem>
            <WhatNextListItem>Document validation</WhatNextListItem>
            <WhatNextListItem>Vehicle inspection scheduling</WhatNextListItem>
            <WhatNextListItem>Training session invitation</WhatNextListItem>
          </WhatNextList>
        </WhatNextBox>

        <ApplicationIdWrapper>
          Application ID: <ApplicationId>{applicationId}</ApplicationId>
        </ApplicationIdWrapper>

        <ContinueButton onClick={handleClose}>
          Go to Rider Dashboard
        </ContinueButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ApplicationSuccessModal;

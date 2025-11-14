import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 



const ApplicationSuccessModal = ({
  applicationId = "RDR-FNSL9GD2K",
  onComplete,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate("/"); 
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
          application and will review it within <strong>24–48 hours</strong>.
          You'll receive an email notification once your application has been
          processed.
        </Message>

        <ApplicationIdWrapper>
          Application ID: <ApplicationId>{applicationId}</ApplicationId>
        </ApplicationIdWrapper>

        <ContinueButton onClick={handleClose}>Go Home</ContinueButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ApplicationSuccessModal;

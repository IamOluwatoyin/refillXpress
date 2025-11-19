/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import {
  FaChevronRight,
  FaRegUser,
  FaStore,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineLocalGasStation } from "react-icons/md";
import {
  FiClock,
  FiCheckCircle,
  FiCompass,
  FiSend,
  FiBox,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";
import styled from "styled-components";

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb;
  padding: 30px;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 1rem 1.25rem;
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.25rem;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonCard = styled(Card)`
  padding: 1rem 1.25rem;
`;

const SkeletonLoader = () => (
  <ContentWrapper>
    {/* Header skeleton */}
    <SkeletonCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <SkeletonBase
          style={{ height: "1.5rem", width: "30%", borderRadius: "0.375rem" }}
        />
        <SkeletonBase
          style={{ height: "1.5rem", width: "20%", borderRadius: "9999px" }}
        />
      </div>
    </SkeletonCard>

    {/* Status card skeleton */}
    <SkeletonCard>
      <div
        style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
      >
        <SkeletonBase
          style={{
            height: "2.5rem",
            width: "2.5rem",
            borderRadius: "9999px",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, width: "100%" }}>
          <SkeletonBase
            style={{ height: "1rem", width: "60%", marginBottom: "0.5rem" }}
          />
          <SkeletonBase style={{ height: "0.875rem", width: "80%" }} />
        </div>
      </div>
    </SkeletonCard>

    {/* Progress card skeleton */}
    <SkeletonCard>
      <SkeletonBase
        style={{ height: "1rem", width: "40%", marginBottom: "1rem" }}
      />
      <SkeletonBase
        style={{ height: "0.5rem", width: "100%", marginBottom: "1.5rem" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.5rem",
          paddingInline: "10px",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <SkeletonBase
              style={{
                height: "2rem",
                width: "100%",
                borderRadius: "9999px",
                margin: "0 auto 0.5rem",
                maxWidth: "2rem",
              }}
            />
            <SkeletonBase
              style={{ height: "0.5rem", width: "70%", margin: "0 auto" }}
            />
          </div>
        ))}
      </div>
    </SkeletonCard>

    {/* Details card skeleton */}
    <SkeletonCard>
      <SkeletonBase
        style={{ height: "1rem", width: "40%", marginBottom: "1rem" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[...Array(3)].map((_, blockIndex) => (
          <div
            key={blockIndex}
            style={{
              paddingBottom: blockIndex < 2 ? "1rem" : "0",
              borderBottom: blockIndex < 2 ? "1px solid #f3f4f6" : "none",
            }}
          >
            {[...Array(3)].map((_, itemIndex) => (
              <div
                key={itemIndex}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: itemIndex < 2 ? "0.75rem" : "0",
                }}
              >
                <SkeletonBase
                  style={{ height: "1rem", width: "1rem", flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <SkeletonBase
                    style={{
                      height: "0.75rem",
                      width: "40%",
                      marginBottom: "0.25rem",
                    }}
                  />
                  <SkeletonBase style={{ height: "0.875rem", width: "70%" }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SkeletonCard>

    {/* Button skeleton */}
    <div style={{ padding: "0 1.25rem", marginBottom: "1rem" }}>
      <SkeletonBase
        style={{ height: "2.7rem", width: "100%", borderRadius: "0.375rem" }}
      />
    </div>
  </ContentWrapper>
);

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
  }

  .close-btn {
    cursor: pointer;
    color: #9ca3af;
    &:hover {
      color: #4b5563;
    }
  }
`;

const AlertBox = styled.div`
  background-color: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  color: #c04500;

  svg {
    margin-right: 0.5rem;
    min-width: 1.25rem;
    min-height: 1.25rem;
    color: #f97316;
  }

  strong {
    font-weight: 600;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.4;
  }
`;

const Form = styled.form`
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
`;

const CodeInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: 0.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  &:focus {
    border-color: #f97316;
    outline: none;
  }
`;

const ExpectedCode = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 1.5rem;

  span {
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
`;

const CancelButton = styled.button`
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const CompleteButton = styled.button`
  flex-grow: 1;
  background-color: #34d399;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #10b981;
  }
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const VerificationModal = ({ expectedCode, onSubmit, onClose, loading }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      onSubmit(code);
    } else {
      alert("Please enter the 6-digit verification code.");
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Complete Delivery</h2>
          <FaTimes className="close-btn" onClick={onClose} />
        </ModalHeader>

        <AlertBox>
          <FiAlertTriangle />
          <div>
            <p>
              <strong>Important</strong>
              <br />
              Ask the customer for their 6-digit verification code to complete
              the refill delivery and release escrow payment.
            </p>
          </div>
        </AlertBox>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="verification-code">Verification Code</label>
          <CodeInput
            id="verification-code"
            type="text"
            pattern="\d{6}"
            maxLength="6"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            required
            disabled={loading}
          />
          <ExpectedCode>
            Example: <span>{expectedCode}</span>
          </ExpectedCode>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose} disabled={loading}>
              Cancel
            </CancelButton>
            <CompleteButton type="submit" disabled={loading}>
              {loading ? "Completing..." : "Complete Delivery"}
            </CompleteButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalBackdrop>
  );
};

const SuccessModalContent = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  position: relative;
  text-align: center;
`;

const SuccessIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    width: 3rem;
    height: 3rem;
    color: #22c55e;
  }
`;

const SuccessTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const SuccessMessage = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const SuccessButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #16a34a;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SuccessModal = ({ onClose }) => (
  <ModalBackdrop onClick={onClose}>
    <SuccessModalContent onClick={(e) => e.stopPropagation()}>
      <SuccessIcon>
        <FiCheckCircle />
      </SuccessIcon>
      <SuccessTitle>Delivery Completed!</SuccessTitle>
      <SuccessMessage>
        Your delivery has been completed successfully. Thank you for your
        excellent service.
      </SuccessMessage>
      <SuccessButton onClick={onClose}>Okay</SuccessButton>
    </SuccessModalContent>
  </ModalBackdrop>
);

const HeaderCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
`;

const OrderId = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
`;

const PriceTag = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #10b981;
  background-color: #d1fae5;
  padding: 0.1rem 0.5rem;
  border-radius: 9999px;
`;

const StatusCard = styled(Card)`
  padding: 0.75rem 1rem;
`;

const StatusContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #fff7ed;
  border-radius: 0.25rem;
`;

const StatusIconWrapper = styled.div`
  margin-right: 0.75rem;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #f97316;
  }
`;

const StatusTitle = styled.p`
  font-weight: 600;
  color: #f97316;
  font-size: 0.9rem;
`;

const StatusSubtitle = styled.p`
  font-size: 0.85rem;
  color: #4b5563;
`;

const ProgressCard = styled(Card)``;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ProgressLine = styled.div`
  height: 8px;
  background-color: #1f2937;
  margin-bottom: 1.5rem;
  border-radius: 2px;
  width: 100%;
  justify-self: center;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-inline: 20px;
  position: relative;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  position: relative;
  z-index: 2;
`;

const StepIconWrapper = styled.div`
  padding: 0.4rem;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 25px;
    height: 25px;
    stroke-width: 2.5;
  }

  ${({ $isCurrent }) =>
    $isCurrent &&
    `
    background-color: #f97316;
    color: white;
  `}
  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    background-color: #fff7ed; 
    color: #f97316;
    border: 1px solid #f97316; 
  `}
  
  ${({ $isFuture }) =>
    $isFuture &&
    `
    background-color: #f3f4f6;
    color: #9ca3af;
    border: 1px solid #e5e7eb;
  `}
`;

const StepLabel = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.7rem;
  color: #6b7280;
  line-height: 1.1;
  font-weight: 500;
  white-space: pre-wrap;

  ${({ $isCurrent }) =>
    $isCurrent &&
    `
    font-weight: 600;
    color: #1f2937;
  `}
`;

const ConfirmCard = styled(Card)`
  padding: 1rem 1.25rem;
`;

const ConfirmHeader = styled.div`
  display: flex;
  align-items: center;
  color: #22c55e;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ConfirmIcon = styled(FiCheckCircle)`
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
`;

const ConfirmText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const NotesArea = styled.textarea`
  background-color: #f3f4f6;
  border: none;
  resize: none;
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
  min-height: 4rem;
  box-sizing: border-box;
  &::placeholder {
    color: #9ca3af;
  }
`;

const VendorLocationCard = styled(Card)`
  padding: 1.25rem;
`;

const VendorTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  & svg {
    margin-right: 0.4rem;
    color: #3b82f6;
  }
`;

const VendorDetails = styled.p`
  font-size: 0.95rem;
  color: #1f2937;
  margin-left: 1.5rem;
  margin-bottom: 0.5rem;
`;

const VendorETA = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  & svg {
    margin-right: 0.25rem;
    color: #4b5563;
  }
`;

const NavigateButton = styled.button`
  width: 100%;
  padding: 0.9rem 1rem;
  background-color: transparent;
  color: #1f2937;
  font-weight: 600;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }

  & svg {
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
  }
`;

const DetailsCard = styled(Card)``;

const DetailBlock = styled.div`
  margin-bottom: 0.5rem;
  padding-top: 0.75rem;
  ${({ $hasBorder }) =>
    $hasBorder &&
    `border-bottom: 1px solid #f3f4f6; padding-bottom: 1rem; margin-bottom: 0.75rem;`}
`;

const DetailItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const DetailIcon = styled.div`
  color: #9ca3af;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;

const DetailText = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailTitle = styled.p`
  color: #9ca3af;
  font-size: 0.85rem;
  margin-bottom: 0.1rem;
`;

const DetailContent = styled.p`
  color: #1f2937;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.3;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.9rem 1rem;
  background-color: #f97316;
  color: white;
  font-weight: 600;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ea580c;
  }

  &:disabled {
    background-color: #fbbd86;
    cursor: not-allowed;
  }

  & svg {
    margin-left: 0.5rem;
    width: 0.75rem;
    height: 0.75rem;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
    margin-left: 0;
    width: 1rem;
    height: 1rem;
  }
`;

const DetailItem = ({ icon: Icon, title, content }) => (
  <DetailItemWrapper>
    <DetailIcon>
      <Icon />
    </DetailIcon>
    <DetailText>
      {title && <DetailTitle>{title}</DetailTitle>}
      <DetailContent>{content}</DetailContent>
    </DetailText>
  </DetailItemWrapper>
);

const StepIndicator = ({ step, index, currentStepIndex }) => {
  const isCurrent = index === currentStepIndex;
  const isFuture = index > currentStepIndex;
  const isCompleted = index < currentStepIndex;

  const getStepIcon = (step) => {
    switch (step) {
      case "Navigate to Customer":
      case "Return to Customer":
        return <FiSend />;
      case "Pick Up Empty Cylinder":
        return <FiBox />;
      case "Navigate to Vendor":
        return <FiCompass />;
      case "Cylinder Refill at Vendor":
        return <FaStore />;
      case "Deliver Filled Cylinder":
        return <FiClock />;
      default:
        return <MdOutlineLocalGasStation />;
    }
  };

  const formatStepLabel = (label) => {
    switch (label) {
      case "Navigate to Customer":
      case "Return to Customer":
        return label.replace(" to ", "\u00a0to\u00a0");
      case "Pick Up Empty Cylinder":
        return "Pick Up\nEmpty Cylinder";
      case "Cylinder Refill at Vendor":
        return "Cylinder Refill\n\u00a0at\u00a0Vendor";
      case "Deliver Filled Cylinder":
        return "Deliver Filled\nCylinder";
      case "Navigate to Vendor":
        return "Navigate\n\u00a0to\u00a0Vendor";
      default:
        return label;
    }
  };

  const stepLabelText = formatStepLabel(step);

  return (
    <StepWrapper>
      <StepIconWrapper
        $isCurrent={isCurrent}
        $isFuture={isFuture}
        $isCompleted={isCompleted}
      >
        {getStepIcon(step)}
      </StepIconWrapper>
      <StepLabel $isCurrent={isCurrent}>
        {stepLabelText.split("\n").map((line, i) => (
          <span key={i} style={{ display: "block", whiteSpace: "nowrap" }}>
            {line.replace(/\u00a0/g, " ")}
          </span>
        ))}
      </StepLabel>
    </StepWrapper>
  );
};

const FullPageLoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3000;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinnerIcon = styled(FiLoader)`
  width: 3rem;
  height: 3rem;
  color: white;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
`;

const mapStatusToStepIndex = (orderStatus) => {
  const statusMap = {
    pending: 0,
    navigatingToCustomer: 0,
    pickedUpCylinder: 1,
    navigatingToVendor: 2,
    refillingCylinder: 3,
    returningToCustomer: 4,
    deliveryComplete: 5,
  };
  return statusMap[orderStatus] || 0;
};

const OrderTracker = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const actualOrderId = orderId || localStorage.getItem("currentOrderId");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [expectedCode] = useState("742891");

  const deliverySteps = [
    "Navigate to Customer",
    "Pick Up Empty Cylinder",
    "Navigate to Vendor",
    "Cylinder Refill at Vendor",
    "Return to Customer",
    "Deliver Filled Cylinder",
  ];

  const statusContent = {
    0: {
      icon: FiSend,
      title: "Navigate to Customer",
      subtitle: "Drive to customer location to pick up empty cylinder",
      buttonText: "Arrived at Customer",
    },
    1: {
      icon: FiBox,
      title: "Pick Up Empty Cylinder",
      subtitle: "Confirm collection of empty cylinder from customer",
      buttonText: "Confirm Pickup",
    },
    2: {
      icon: FiCompass,
      title: "Navigate to Vendor",
      subtitle: "Drive to vendor location to exchange cylinder",
      buttonText: "Arrived at Vendor",
    },
    3: {
      icon: FaStore,
      title: "Cylinder Refill at Vendor",
      subtitle: "Waiting for vendor to refill the cylinder",
      buttonText: "Cylinder Ready - Continue",
    },
    4: {
      icon: FiSend,
      title: "Return to Customer",
      subtitle: "Drive back to customer with the filled cylinder",
      buttonText: "Arrived at Customer",
    },
    5: {
      icon: FiClock,
      title: "Deliver Filled Cylinder",
      subtitle: "Confirm delivery and collect payment/signature",
      buttonText: "Complete Delivery",
    },
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!actualOrderId || !authToken) {
        setLoading(false);
        setFetchError("Missing Order ID or Auth Token.");
        return;
      }

      setLoading(true);
      setFetchError(null);

      try {
        const response = await axios.get(
          `https://refillexpress.onrender.com/api/v1/orders/getOneOrder/${actualOrderId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        const data = response.data.data;
        setOrderData(data);

        const savedStepIndex = localStorage.getItem(
          `orderStep_${actualOrderId}`
        );
        if (savedStepIndex) {
          setCurrentStepIndex(parseInt(savedStepIndex, 10));
        } else {
          const currentStatus = data.orderStatus || "pending";
          const stepIndex = mapStatusToStepIndex(currentStatus);
          setCurrentStepIndex(stepIndex);
        }
      } catch (error) {
        console.error(
          "Failed to fetch order details:",
          error.response?.data || error
        );
        setFetchError(
          "Failed to load order details. Check console for API error."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [actualOrderId]);

  useEffect(() => {
    if (actualOrderId && currentStepIndex !== null) {
      localStorage.setItem("currentOrderId", actualOrderId);
      localStorage.setItem(
        `orderStep_${actualOrderId}`,
        currentStepIndex.toString()
      );
    }
  }, [currentStepIndex, actualOrderId]);

  const handleCompleteOrder = async (verificationCode) => {
    const orderIdToComplete = actualOrderId;
    const authToken = localStorage.getItem("authToken");

    if (!orderIdToComplete || !authToken) {
      alert("Missing Order ID or Auth Token.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = `https://refillexpress.onrender.com/api/v1/rider/complete/order/${orderIdToComplete}`;

      const response = await axios.patch(
        endpoint,
        { otp: verificationCode },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsModalOpen(false);
      window.scrollTo(0, 0);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(
        "Error completing order:",
        error.response?.status,
        error.response?.data
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to complete order. Please verify the OTP and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    localStorage.removeItem(`orderStep_${actualOrderId}`);
    localStorage.removeItem("currentOrderId");
    navigate("/rider-dashboard/order");
  };

  const trackingStages = [
    "navigatingToCustomer",
    "pickedUpCylinder",
    "navigatingToVendor",
    "refillingCylinder",
    "returningToCustomer",
  ];

  const handleNextStep = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      alert("Missing auth token.");
      return;
    }

    const currentStage = trackingStages[currentStepIndex];
    const isFinalStep = currentStepIndex === trackingStages.length - 1;

    setLoading(true);
    try {
      await axios.put(
        `https://refillexpress.onrender.com/api/v1/order/tracking/${actualOrderId}/status`,
        { orderStatus: currentStage },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (isFinalStep) {
        setIsModalOpen(true);
        setLoading(false);
        return;
      }

      window.scrollTo(0, 0);
      setCurrentStepIndex((prev) => prev + 1);
    } catch (error) {
      console.error(
        "Failed to update tracking status:",
        error.response || error
      );
      alert("Failed to update tracking status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchError) {
    return <PageContainer style={{ color: "red" }}>{fetchError}</PageContainer>;
  }

  if (loading || !orderData) {
    return (
      <PageContainer>
        <SkeletonLoader />
      </PageContainer>
    );
  }

  const orderInfo = {
    orderId: orderData.orderNumber || "N/A",
    price: orderData.totalPrice
      ? `₦${Number(orderData.totalPrice).toLocaleString()}`
      : "N/A",
    cylinderType: `${orderData.cylinderSize || "N/A"}kg LPG (x${
      orderData.quantity || 1
    })`,
  };

  const customerDetails = {
    name: `Customer (ID: ${orderData.userId.substring(0, 8)})`,
    address: orderData.deliveryAddress || "N/A (Missing Delivery Address)",
    phone: "N/A (Phone Not in Response)",
  };

  const vendorDetails = {
    name: `Vendor (ID: ${orderData.vendorId.substring(0, 8)})`,
    address: orderData.pickupAddress || "N/A (Missing Pickup Address)",
    phone: "+234XXXXXX (Placeholder Phone)",
    eta: "8 min • 3.7 km (Placeholder)",
  };

  const {
    icon: StatusIcon,
    title: statusTitle,
    subtitle: statusSubtitle,
    buttonText,
  } = statusContent[currentStepIndex] || statusContent[0];

  return (
    <PageContainer>
      {loading && (
        <FullPageLoadingOverlay>
          <LoadingSpinnerIcon />
          <LoadingText>Processing...</LoadingText>
        </FullPageLoadingOverlay>
      )}

      <ContentWrapper>
        <HeaderCard>
          <OrderId>Order **{orderInfo.orderId}**</OrderId>
          <PriceTag>{orderInfo.price}</PriceTag>
        </HeaderCard>

        <StatusCard>
          <StatusContent>
            <StatusIconWrapper>
              <StatusIcon />
            </StatusIconWrapper>
            <div>
              <StatusTitle>{statusTitle}</StatusTitle>
              <StatusSubtitle>{statusSubtitle}</StatusSubtitle>
            </div>
          </StatusContent>
        </StatusCard>

        <ProgressCard>
          <SectionTitle>Delivery Progress</SectionTitle>
          <div style={{ position: "relative" }}>
            <ProgressLine />
            <StepContainer>
              {deliverySteps.map((step, index) => (
                <StepIndicator
                  key={step}
                  step={step}
                  index={index}
                  currentStepIndex={currentStepIndex}
                />
              ))}
            </StepContainer>
          </div>
        </ProgressCard>

        {currentStepIndex === 2 && (
          <VendorLocationCard>
            <VendorTitle>
              <FaMapMarkerAlt />
              Vendor Location
            </VendorTitle>
            <VendorDetails>{vendorDetails.name}</VendorDetails>
            <VendorDetails>{vendorDetails.address}</VendorDetails>
            <VendorETA>
              <FiClock style={{ verticalAlign: "middle" }} /> ETA:{" "}
              {vendorDetails.eta}
            </VendorETA>
            <NavigateButton>
              <FiCompass />
              Navigate
            </NavigateButton>
          </VendorLocationCard>
        )}

        {currentStepIndex === 1 && (
          <ConfirmCard>
            <ConfirmHeader>
              <ConfirmIcon />
              Confirm Pickup
            </ConfirmHeader>
            <ConfirmText>
              Verify you've collected the empty cylinder from the customer
            </ConfirmText>
            <p
              style={{ fontSize: "0.75rem", fontWeight: 500, color: "#4b5563" }}
            >
              Notes (Optional)
            </p>
            <NotesArea
              placeholder="Add any special notes about the pickup/delivery..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </ConfirmCard>
        )}

        <DetailsCard>
          <SectionTitle>Order Details</SectionTitle>
          <div>
            <DetailBlock $hasBorder={true}>
              <DetailItem
                icon={FaRegUser}
                title="Customer (Delivery Location)"
                content={customerDetails.name}
              />
              <DetailItem
                icon={FaMapMarkerAlt}
                content={customerDetails.address}
              />
              <DetailItem icon={FaPhoneAlt} content={customerDetails.phone} />
            </DetailBlock>

            <DetailBlock $hasBorder={true}>
              <DetailItem
                icon={FaStore}
                title="Vendor (Pickup Location)"
                content={vendorDetails.name}
              />
              <DetailItem
                icon={FaMapMarkerAlt}
                content={vendorDetails.address}
              />
              <DetailItem icon={FaPhoneAlt} content={vendorDetails.phone} />
            </DetailBlock>

            <DetailBlock $hasBorder={false}>
              <DetailItem
                icon={MdOutlineLocalGasStation}
                title="Cylinder Type"
                content={orderInfo.cylinderType}
              />
            </DetailBlock>
          </div>
        </DetailsCard>

        <div style={{ padding: "0 1.25rem", marginBottom: "1rem" }}>
          <ActionButton onClick={handleNextStep} disabled={loading}>
            {loading ? (
              <>
                <FiLoader className="loading-spinner" />
                Processing...
              </>
            ) : (
              <>
                {buttonText} <FaChevronRight />
              </>
            )}
          </ActionButton>
        </div>
      </ContentWrapper>

      {isModalOpen && (
        <VerificationModal
          expectedCode={expectedCode}
          onSubmit={handleCompleteOrder}
          onClose={() => setIsModalOpen(false)}
          loading={loading}
        />
      )}

      {isSuccessModalOpen && <SuccessModal onClose={handleSuccessModalClose} />}
    </PageContainer>
  );
};

export default OrderTracker;

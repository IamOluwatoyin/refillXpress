/* eslint-disable no-constant-binary-expression */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
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
} from "react-icons/fi";
import { toast } from "react-toastify";

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb;
  padding: 30px;
  display: flex;
  justify-content: center;

  /* Added mobile responsiveness */
  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 1rem 1.25rem;

  /* Adjusted padding for tablets and mobile */
  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
  }
`;

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

  /* Responsive modal for mobile */
  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 0.375rem;
  }
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

  /* Responsive heading for mobile */
  @media (max-width: 480px) {
    h2 {
      font-size: 1rem;
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

  /* Responsive alert box for small screens */
  @media (max-width: 480px) {
    padding: 0.625rem;

    svg {
      margin-right: 0.375rem;
      min-width: 1rem;
      min-height: 1rem;
    }

    p {
      font-size: 0.8rem;
      line-height: 1.3;
    }
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

  /* Responsive label for mobile */
  @media (max-width: 480px) {
    label {
      font-size: 0.8rem;
    }
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

  /* Smaller input for mobile */
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.625rem;
    letter-spacing: 0.3rem;
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

  /* Responsive expected code text */
  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-bottom: 1.25rem;
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

  /* Stacked buttons on mobile */
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;

    button {
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
    }
  }
`;

const CancelButton = styled.button`
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  &:hover {
    background-color: #e5e7eb;
  }

  @media (max-width: 480px) {
    width: 100%;
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

  @media (max-width: 480px) {
    flex-grow: 0;
    width: 100%;
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
            Expected: <span>{expectedCode}</span>
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

const HeaderCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;

  /* Responsive header card layout */
  @media (max-width: 768px) {
    padding: 0.625rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }
`;

const OrderId = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;

  /* Smaller text for mobile */
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const PriceTag = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #10b981;
  background-color: #d1fae5;
  padding: 0.1rem 0.5rem;
  border-radius: 9999px;

  /* Smaller price tag for mobile */
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.05rem 0.375rem;
  }
`;

const StatusCard = styled(Card)`
  padding: 0.75rem 1rem;

  @media (max-width: 480px) {
    padding: 0.625rem 0.75rem;
  }
`;

const StatusContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #fff7ed;
  border-radius: 0.25rem;

  /* Responsive status content */
  @media (max-width: 480px) {
    padding: 0.625rem;
    flex-direction: column;
    text-align: center;
  }
`;

const StatusIconWrapper = styled.div`
  margin-right: 0.75rem;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #f97316;
  }

  /* Centered icon on mobile */
  @media (max-width: 480px) {
    margin-right: 0;
    margin-bottom: 0.5rem;

    & svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

const StatusTitle = styled.p`
  font-weight: 600;
  color: #f97316;
  font-size: 0.9rem;

  /* Smaller title for mobile */
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const StatusSubtitle = styled.p`
  font-size: 0.85rem;
  color: #4b5563;

  /* Smaller subtitle for mobile */
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const ProgressCard = styled(Card)``;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;

  /* Smaller section title for mobile */
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ProgressLine = styled.div`
  height: 8px;
  background-color: #1f2937;
  margin-bottom: 1.5rem;
  border-radius: 2px;
  width: 100%;
  justify-self: center;

  /* Thinner progress line on mobile */
  @media (max-width: 480px) {
    height: 6px;
    margin-bottom: 1.25rem;
  }
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-inline: 20px;
  position: relative;

  /* Responsive step container for mobile */
  @media (max-width: 768px) {
    padding-inline: 10px;
  }

  @media (max-width: 480px) {
    padding-inline: 5px;
    gap: 0.25rem;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  position: relative;
  z-index: 2;

  /* Adjusted step wrapper for mobile screens */
  @media (max-width: 768px) {
    width: 16.666%;
  }

  @media (max-width: 480px) {
    width: auto;
    flex: 1;
  }
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
    $isCurrent && `background-color: #f97316; color: white;`}
  ${({ $isCompleted }) =>
    $isCompleted &&
    `background-color: #fff7ed; color: #f97316; border: 1px solid #f97316;`}
  ${({ $isFuture }) =>
    $isFuture &&
    `background-color: #f3f4f6; color: #9ca3af; border: 1px solid #e5e7eb;`}

  /* Smaller step icons for mobile */
  @media (max-width: 768px) {
    padding: 0.3rem;

    & svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.25rem;

    & svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const StepLabel = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.7rem;
  color: #6b7280;
  line-height: 1.1;
  font-weight: 500;
  white-space: pre-wrap;

  ${({ $isCurrent }) => $isCurrent && `font-weight: 600; color: #1f2937;`}

  /* Hidden step labels on very small screens */
  @media (max-width: 480px) {
    font-size: 0.55rem;
    margin-top: 0.25rem;
    line-height: 1;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;

const ConfirmCard = styled(Card)`
  padding: 1rem 1.25rem;

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
  }
`;

const ConfirmHeader = styled.div`
  display: flex;
  align-items: center;
  color: #22c55e;
  margin-bottom: 0.5rem;
  font-weight: 600;

  /* Responsive header for confirm card */
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ConfirmIcon = styled(FiCheckCircle)`
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;

  @media (max-width: 480px) {
    width: 1rem;
    height: 1rem;
  }
`;

const ConfirmText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;

  /* Smaller confirm text for mobile */
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
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

  /* Responsive textarea for mobile */
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.625rem;
    min-height: 3rem;
  }
`;

const VendorLocationCard = styled(Card)`
  padding: 1.25rem;

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
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

  /* Smaller vendor title for mobile */
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const VendorDetails = styled.p`
  font-size: 0.95rem;
  color: #1f2937;
  margin-left: 1.5rem;
  margin-bottom: 0.5rem;

  /* Responsive vendor details */
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-left: 1.25rem;
  }
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

  /* Responsive vendor ETA */
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-left: 1.25rem;
    margin-bottom: 1rem;
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

  /* Responsive navigate button */
  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.875rem;
  }
`;

const DetailsCard = styled(Card)``;

const DetailBlock = styled.div`
  margin-bottom: 0.5rem;
  padding-top: 0.75rem;
  ${({ $hasBorder }) =>
    $hasBorder &&
    `border-bottom: 1px solid #f3f4f6; padding-bottom: 1rem; margin-bottom: 0.75rem;`}

  /* Adjusted spacing for mobile */
  @media (max-width: 480px) {
    margin-bottom: 0.375rem;
    padding-top: 0.625rem;

    ${({ $hasBorder }) =>
      $hasBorder && `padding-bottom: 0.75rem; margin-bottom: 0.625rem;`}
  }
`;

const DetailItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;

  /* Tighter spacing on mobile */
  @media (max-width: 480px) {
    margin-bottom: 0.625rem;
  }
`;

const DetailIcon = styled.div`
  color: #9ca3af;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  & > svg {
    width: 1rem;
    height: 1rem;
  }

  /* Smaller icons for mobile */
  @media (max-width: 480px) {
    margin-right: 0.375rem;
    margin-top: 0.125rem;

    & > svg {
      width: 0.875rem;
      height: 0.875rem;
    }
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

  /* Smaller detail title for mobile */
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const DetailContent = styled.p`
  color: #1f2937;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.3;

  /* Smaller detail content for mobile */
  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.25;
  }
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

  /* Responsive action button */
  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.875rem;
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

const OrderTracker = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

      if (!orderId || !authToken) {
        setLoading(false);
        setFetchError("Missing Order ID or Auth Token.");
        return;
      }

      setLoading(true);
      setFetchError(null);

      try {
        const response = await axios.get(
          `https://refillexpress.onrender.com/api/v1/orders/getOneOrder/${orderId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        console.log("this is response:", response);

        const data = response.data.data;
        setOrderData(data);
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
  }, [orderId]);

  const handleCompleteOrder = async (verificationCode) => {
    const orderIdToComplete = orderId;
    const authToken = localStorage.getItem("authToken");

    if (!orderIdToComplete || !authToken) {
      alert("Missing Order ID or Auth Token.");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `https://refillexpress.onrender.com/api/v1/rider/complete/order/${orderIdToComplete}`,
        { verificationCode: verificationCode },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Order completed successfully!");
      navigate("/rider/order");
    } catch (error) {
      console.error("Error completing order:", error.response || error);
      alert(
        error.response?.data?.message ||
          "Failed to complete order. Please check the code and try again."
      );
    } finally {
      setIsModalOpen(false);
      setLoading(false);
    }
  };

  const trackingStages = [
    "arrivedAtCustomer",
    "pickedUpCylinder",
    "arrivedAtVendor",
    "cylinderRefilled",
    "leftVendor",
    "deliveredFilledCylinder",
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
        `https://refillexpress.onrender.com/api/v1/order/tracking/${orderId}/status`,
        { status: currentStage },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (isFinalStep) {
        setIsModalOpen(true);
        return;
      }

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

  // --- Render Logic: Loading/Error State ---
  if (loading || !orderData) {
    return (
      <PageContainer>
        {loading ? "Loading order details..." : "Initializing..."}
      </PageContainer>
    );
  }
  if (fetchError) {
    return <PageContainer style={{ color: "red" }}>{fetchError}</PageContainer>;
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
    name: `${orderData.user?.firstName} ${orderData.user?.lastName}` || "N/A",
    address: orderData.deliveryAddress || "N/A (Missing Delivery Address)",
    phone: orderData.user?.phoneNumber || "N/A",
  };

  const vendorDetails = {
    name: `${orderData.vendor?.businessName || "Vendor"}` || "N/A",
    address: orderData.pickupAddress || "N/A (Missing Pickup Address)",
    phone: orderData.vendor?.phoneNumber || "+234XXXXXX (Placeholder Phone)",
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
            {loading ? "Processing..." : buttonText} <FaChevronRight />
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
    </PageContainer>
  );
};

export default OrderTracker;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentModal from "./user-dashboard/modals/PaymentModal";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const paymentLink = location.state?.paymentLink;
  const [showPaymentModal, setShowPaymentModal] = useState(true);

  useEffect(() => {
    
    if (paymentLink) {
      window.open(paymentLink, "_blank");
    }
  }, [paymentLink]);

  return (
    <main className="payment-page">
      <h2>Payment</h2>
      <p>
        Please complete your payment using the link below.
      </p>

      {paymentLink ? (
        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="payment-link"
        >
          Proceed to Payment
        </a>
      ) : (
        <p className="no-link">No payment link available</p>
      )}

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </main>
  );
};

export default PaymentPage;

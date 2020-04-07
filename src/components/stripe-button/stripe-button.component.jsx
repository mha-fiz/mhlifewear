import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const publishableKey = "pk_test_s7D8BoDAeIfTWEXpawWWdrxW00Rz9tj1st";
  const priceForStripe = price * 100;

  const onToken = (token) => {
    console.log(token);
    alert("Payment successful!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="MH Lifewear"
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      // image='https://svgshare.com/i/CUz.svg'
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

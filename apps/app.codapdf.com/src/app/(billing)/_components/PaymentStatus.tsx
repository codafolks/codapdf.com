"use client";
import { StatusBar, type StatusBarVariant } from "@/client/components/app/StatusBar";
import { env } from "@/constants/env.client";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export const PaymentStatus = () => {
  const stripePromise = loadStripe(env.STRIPE_PUBLISHABLE_KEY);
  const [message, setMessage] = useState<{ message: string; status: StatusBarVariant } | null>(null);

  const clientSecret = typeof window !== "undefined" ? new URLSearchParams(window?.location?.search).get("payment_intent_client_secret") : null;
  const checkStatus = async (clientSecret: string | null) => {
    if (!clientSecret) return;
    const stripe = await stripePromise;
    const response = await stripe?.retrievePaymentIntent(clientSecret);
    const paymentIntent = response?.paymentIntent;
    if (!paymentIntent) return;
    switch (paymentIntent.status) {
      case "succeeded":
        setMessage({
          message: "Success! Payment received.",
          status: "success",
        });
        break;
      case "processing":
        setMessage({
          message: "Payment processing. We'll update you when payment is received.",
          status: "info",
        });
        break;
      case "requires_payment_method":
        setMessage({
          message: "Payment failed. Please try again.",
          status: "error",
        });
        break;
      default:
        setMessage({
          message: "Something went wrong.",
          status: "error",
        });
        break;
    }
  };
  useEffect(() => {
    checkStatus(clientSecret);
  }, [clientSecret]);
  if (!message) return null;

  return <StatusBar description={message?.message} variant={message.status} className="sticky top-0 " />;
};

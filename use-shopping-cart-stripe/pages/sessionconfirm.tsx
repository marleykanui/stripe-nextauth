// React
import { useState, useEffect } from "react";

// Next
import { useRouter } from "next/router";

// SWR
import useSWR from "swr";

// Utils
import { getSessionData } from "@/utils/3-stripe/getSessionData";
import { dbUpdateWithNewSession } from "@/utils/3-stripe/dbUpdateWithNewSession";

// Components
import Layout from "@/components/layout/3-components/Layout";
import Cart from "@/components/cart/3-components/Cart";
import PrintObject from "@/components/cart/3-components/PrintObject";
import ClearCart from "@/components/cart/3-components/ClearCart";

// Next Types
import { NextPage } from "next";

const SessionConfirmation: NextPage = () => {
  // Change when db has been updated
  const [DBUpdated, setDBUpdated] = useState(false);

  // Access router to get URL
  const router = useRouter();

  // Retreive Session Data from URL query string
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    getSessionData
  );

  // Update Session
  useEffect(() => {
    if (data && !DBUpdated) {
      dbUpdateWithNewSession(data);
      setDBUpdated(true);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;

  return (
    <Layout title="Session Confirm">
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.data.payment_intent?.status ?? "loading..."}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data?.data ?? "loading..."} />
        <Cart>
          <ClearCart />
        </Cart>
      </div>
    </Layout>
  );
};

export default SessionConfirmation;

// React
import { useState, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Axios
import axios from 'axios';

// Moment
import moment from '../node_modules/moment';

// SWR
import useSWR from 'swr';

// Components
import Layout from '@/components/layout/3-components/Layout';
import Cart from '@/components/cart/3-components/Cart';
import PrintObject from '@/components/cart/3-components/PrintObject';
import ClearCart from '@/components/cart/3-components/ClearCart';

// Next Types
import { NextPage } from 'next';

const SessionConfirmation: NextPage = () => {
  const [DBUpdated, setDBUpdated] = useState(false);
  const router = useRouter();

  //
  const getSessionData = async (sessionUrl: string) => {
    try {
      const sessionData = await axios.get(sessionUrl);
      return sessionData;
    } catch (error) {
      console.error(error);
    }
  };

  // Retreive Session Data from URL query string
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    getSessionData
  );

  const dbUpdateWithNewSession = async (sessionData: any) => {
    const {
      data: {
        customer,
        customer_email,
        line_items,
        amount_total,
        payment_intent: { charges },
      },
    } = sessionData;

    // Set Up Customer Transaction model
    const customerTransactions = {
      [charges.data[0].id]: {
        transactionReceiptUrl: charges.data[0].receipt_url,
        transactionDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
        purchaseAmount: amount_total,
        purchaseAmountInUsd: `$${amount_total / 100}.00`,
        paymentMethodType: charges.data[0].payment_method_details.type,
        nameOnCard: charges.data[0].billing_details.name,
        currency: charges.data[0].currency,
        purchasedProductData: line_items.data,
      },
    };

    try {
      // Check if current customer already exist in DB
      const currentCheckoutSession = await axios.post('/api/db/findCustomer', {
        params: { customer_email },
      });

      // Check if current transaction id is already in
      // customerTransactions object, covert to boolean,
      // and store in variable for later use
      const isDocumentedTransaction = Boolean(
        currentCheckoutSession.data.customerTransactions[charges.data[0].id]
      );

      // If no correlative DB data found:
      if (!currentCheckoutSession.data) {
        // create a new customer w/ initial transaction
        await axios.post('/api/db/createCustomer', {
          customeId: customer,
          customerEmail: customer_email,
          customerTransactions,
        });
        // else if customer already exists in DB
        // and the current session transactionID is NOT
        // in the customerTransactions object yet
      } else if (!isDocumentedTransaction) {
        // append new transaction to customerTransactions object
        // in pre-existing customer object
        await axios.put('/api/db/updateCustomerTransactions', {
          customerEmail: currentCheckoutSession.data.customerEmail,
          currentTransactionId: charges.data[0].id,
          currentTransactionData: customerTransactions[charges.data[0].id],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data && !DBUpdated) {
      dbUpdateWithNewSession(data);
      setDBUpdated(true);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.data.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data?.data ?? 'loading...'} />
        <Cart>
          <ClearCart />
        </Cart>
      </div>
    </Layout>
  );
};

export default SessionConfirmation;

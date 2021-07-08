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

// Use-Shopping-Cart
import { useShoppingCart } from 'use-shopping-cart';

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

  const getSessionData = async (sessionUrl: string) => {
    try {
      const sessionData = await axios.get(sessionUrl);
      return sessionData;
    } catch (error) {
      console.error(error);
    }
  };

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
        payment_intent: { charges },
      },
    } = sessionData;
    try {
      await axios.post('/api/db/createCustomer', {
        customer_id: customer,
        customer_email: customer_email,
        customer_name: charges.data[0].billing_details.name,
        customer_transactions: [
          {
            transaction_id: charges.data[0].id,
            transaction_date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            transaction_receipt_url: charges.data[0].receipt_url,
            payment_method_type: charges.data[0].payment_method_details.type,
            currency: charges.data[0].currency,
            purchased_product_data: line_items.data,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data && !DBUpdated) {
      dbUpdateWithNewSession(data);
      setDBUpdated(true);
    }
    console.log(data);
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

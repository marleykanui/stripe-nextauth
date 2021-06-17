// React
import { useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Axios
import axios from 'axios';

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

const ResultPage: NextPage = () => {
  const router = useRouter();

  const getSessionData = async (sessionUrl: string) => {
    try {
      const sessionData = await axios.get(sessionUrl);
      return sessionData;
    } catch (error) {
      console.error(error);
    }
  };

  const dbUpdateWithNewSession =
    // const { data, error } = useSWR(
    //   router.query.session_id
    //     ? `/api/checkout_sessions/${router.query.session_id}`
    //     : null,
    //   getSessionData
    // );

    // const setCustomerId = async () => {
    //   getSessionData(
    //     router.query.session_id
    //       ? `/api/checkout_sessions/${router.query.session_id}`
    //       : null
    //   );
    //   // try {
    //   await axios.post('/api/db/createCustomer', {
    //     customer_id: sessionData.customer,
    // customer_email: data.customer_email,
    // customer_name: data.charges.data[0].billing_details.name,
    // customer_transactions: [
    //   {
    //     transaction_id: data.charges.data[0].id,
    //     transaction_date: Date.now(),
    //     transaction_receipt_url: data.charges.data[0].receipt_url,
    //     payment_method_type:
    //       data.charges.data[0].payment_method_details.type,
    //     currency: data.charges.data[0].currency,
    //     transaction_amount: data.charges.data[0].amount_captured,
    //   },
    // ],
    // });
    // } catch (error) {
    //   console.error(error);
    // }
    // };

    useEffect(() => {
      setCustomerId();
    }, []);

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

export default ResultPage;

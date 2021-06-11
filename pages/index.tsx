// Stripe
import Stripe from 'stripe';

// Stripe Helpers
import { loadStripe } from '@stripe/stripe-js';

// Next-Stripe
import { createCheckoutSession } from 'next-stripe/client';

// Next
import Head from 'next/head';
import Image from 'next/image';

// Components
import ProductCard from '../components/ProductCard';

// Styles
import styles from '../styles/Home.module.css';

// React Types
import { FC } from 'react';

// Next Types
import { GetServerSideProps } from 'next';

// Component Level Types
interface StripePrice extends Stripe.Price {
  product: Stripe.Product;
}

interface IndexProps {
  prices: StripePrice[];
}

const Index: FC<IndexProps> = ({ prices }) => {
  const handleProductSelect = async (priceId: string) => {};
  return (
    <div className={styles.container}>
      <div className="flex flex-row">
        {prices.reverse().map(({ id, product, unit_amount }) => {
          return (
            <div key={id}>
              <ProductCard
                name={product.name}
                description={product.description}
                image={product.images[0]}
                price={unit_amount}
              />
              <button onClick={() => handleProductSelect(id)}></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
  });

  return {
    props: {
      prices: prices.data,
    },
  };
};
export default Index;

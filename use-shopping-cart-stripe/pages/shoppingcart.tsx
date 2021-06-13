// Stripe
import Stripe from 'stripe';

// Components
import Layout from '@/components/layout/3-components/Layout';
import Cart from '@/components/cart/3-components/Cart';
import CartSummary from '@/components/cart/3-components/CartSummary';
import Products from '@/components/cart/3-components/Products';

// Next Types
import { NextPage, GetServerSideProps } from 'next';

// Component Level Types
import { ProductsProps } from '@/components/cart/0-types/ProductProps';

const DonatePage: NextPage<ProductsProps> = ({ products }) => {
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">
      <Cart>
        <CartSummary products={products} />
        <Products products={products} />
      </Cart>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });
  const products = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
  });

  return {
    props: {
      products: products.data,
    },
  };
};

export default DonatePage;

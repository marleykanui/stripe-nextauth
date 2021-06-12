// Components
import Layout from '@/components/layout/3-components/Layout';
import Cart from '@/components/cart/3-components/Cart';
import CartSummary from '@/components/cart/3-components/CartSummary';
import Products from '@/components/cart/3-components/Products';

// Next Types
import { NextPage } from 'next';

const DonatePage: NextPage = () => {
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">
      <Cart>
        <CartSummary />
        <Products />
      </Cart>
    </Layout>
  );
};

export default DonatePage;

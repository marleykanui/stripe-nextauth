// Use-Shopping-Cart
import { CartProvider } from 'use-shopping-cart';

// Stripe Instance
import getStripe from '@/utils/3-stripe/getStripe';

// Cart Config Params
import * as config from '@/config/index';

// React Types
import { FC } from 'react';

// Component Level Types
import { CartProps } from '../0-types/CartProps';

const Cart: FC<CartProps> = ({ children }) => (
  <CartProvider
    mode="checkout-session"
    stripe={getStripe()}
    currency={config.CURRENCY}
  >
    <>{children}</>
  </CartProvider>
);

export default Cart;

// Use-Shopping-Cart
import { CartProvider } from "use-shopping-cart";

// Stripe Key
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Cart Config Params
import * as config from "@/config/index";

// React Types
import { FC } from "react";

// Component Level Types
import { CartProps } from "../0-types/CartProps";

const Cart: FC<CartProps> = ({ children }) => {
  return (
    <CartProvider
      mode="checkout-session"
      stripe={stripeKey}
      currency={config.CURRENCY}
    >
      <>{children}</>
    </CartProvider>
  );
};

export default Cart;

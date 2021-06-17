// React
import { useState, useEffect } from 'react';

// Next-Auth
import { useSession } from 'next-auth/client';

// Use-Shopping-Cart
import { useShoppingCart } from 'use-shopping-cart';

// Axios
import axios from 'axios';

// React Types
import { FC, FormEventHandler } from 'react';

// Component Level Types
import { ProductsProps } from '@/components/cart/0-types/ProductProps';

const CartSummary: FC<ProductsProps> = ({ products }) => {
  const [session, loading] = useSession();
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/checkout_sessions/cart', {
      cartDetails,
      customerEmail: session.user.email,
    });

    console.log(response);
    if (response.status === 500) {
      console.error(response.statusText);
      return;
    }

    redirectToCheckout({ sessionId: response.data.id });
  };

  return (
    <form onSubmit={handleCheckout}>
      <h2>Cart summary</h2>
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>
      <button
        className="cart-style-background"
        type="submit"
        disabled={cartEmpty || loading}
      >
        Checkout
      </button>
      <button
        className="cart-style-background"
        type="button"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </form>
  );
};

export default CartSummary;

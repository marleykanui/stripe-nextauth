// React
import { useState, useEffect } from 'react';

// Use-Shopping-Cart
import { useShoppingCart } from 'use-shopping-cart';

// Utils
import { fetchPostJSON } from '@/utils/0-api/fetchPostJson';

// React Types
import { FC } from 'react';

const CartSummary: FC = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    console.log(formattedTotalPrice, cartCount, cartDetails);
    // setLoading(true);

    // const response = await fetchPostJSON(
    //   '/api/checkout_sessions/cart',
    //   cartDetails
    // );

    // if (response.statusCode === 500) {
    //   console.error(response.message);
    //   return;
    // }

    // redirectToCheckout({ sessionId: response.id });
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

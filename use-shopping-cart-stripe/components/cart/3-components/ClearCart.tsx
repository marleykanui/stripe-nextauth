// React
import { useEffect } from "react";

// Use-Shopping-Cart
import { useShoppingCart } from "use-shopping-cart";

export default function ClearCart() {
  const { clearCart } = useShoppingCart();

  useEffect(() => clearCart(), []);

  return <p>Cart cleared.</p>;
}

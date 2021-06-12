// Stripe
import Stripe from 'stripe';

// Component Level Types
interface StripePrice extends Stripe.Price {
  product: Stripe.Product;
}

export interface ProductsProps {
  products: StripePrice[];
}

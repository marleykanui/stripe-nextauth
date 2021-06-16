// Stripe
import Stripe from 'stripe';

// Custom
import { validateCartItems } from '@/utils/3-stripe/validateCartItems';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

// Stripe Instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

const handleCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const cartItems = req.body;
      const productInventory = await stripe.prices.list({
        active: true,
        limit: 10,
        expand: ['data.product'],
      });

      const line_items = validateCartItems(
        productInventory.data as any,
        cartItems
      );

      const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'payment',
        payment_method_types: ['card'],
        line_items,
        success_url: `${req.headers.origin}/sessionconfirm?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/shoppingcart`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handleCheckoutSession;

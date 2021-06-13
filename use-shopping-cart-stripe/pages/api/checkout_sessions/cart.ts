// Stripe
import Stripe from 'stripe';

// // Use-Shopping-Cart
// import { validateCartItems } from 'use-shopping-cart/src/serverUtil';
// Custom
import { validateCartItems } from '@/utils/1-stripe/validateCartItems';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Validate the cart details that were sent from the client.
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

      // console.log(JSON.stringify(productInventory.data, null, 2));
      // console.log('##########################################');
      // console.log(JSON.stringify(cartItems, null, 2));

      console.log(cartItems);
      // console.log(values(cartItems[0]));

      const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{}],

        // [
        //   { price: Object.keys(cartItems)[0], quantity: 2 },
        //   { price: Object.keys(cartItems)[1], quantity: 2 },
        //   { price: Object.keys(cartItems)[2], quantity: 2 },
        // ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
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
}

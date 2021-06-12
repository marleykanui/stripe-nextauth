// Stripe
import Stripe from 'stripe';

// Use-Shopping-Cart
import { validateCartItems } from 'use-shopping-cart/src/serverUtil';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   console.log(req);
  //   if (req.method === 'POST') {
  //     try {
  //       // Validate the cart details that were sent from the client.
  //       const cartItems = req.body;
  //       const line_items = validateCartItems(ProductData, cartItems);
  //       // Create Checkout Sessions from body params.
  //       const params: Stripe.Checkout.SessionCreateParams = {
  //         submit_type: 'pay',
  //         payment_method_types: ['card'],
  //         billing_address_collection: 'auto',
  //         shipping_address_collection: {
  //           allowed_countries: ['US', 'CA'],
  //         },
  //         line_items,
  //         success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  //         cancel_url: `${req.headers.origin}/shoppingcart`,
  //       };
  //       const checkoutSession: Stripe.Checkout.Session =
  //         await stripe.checkout.sessions.create(params);
  //       res.status(200).json(checkoutSession);
  //     } catch (err) {
  //       res.status(500).json({ statusCode: 500, message: err.message });
  //     }
  //   } else {
  //     res.setHeader('Allow', 'POST');
  //     res.status(405).end('Method Not Allowed');
  //   }
}

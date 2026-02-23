import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let event;

    const buffer = await getRawBody(req);

    try {
      event = stripe.webhooks.constructEvent(
        buffer,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntent);
        break;
      // ... handle other event types
      default:
        console.warn(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method Not Allowed`);
  }
};

const getRawBody = (req) => {
  return new Promise((resolve, reject) => {
    let data = '';
    req
      .on('data', chunk => { data += chunk; })
      .on('end', () => resolve(data))
      .on('error', err => reject(err));
  });
};

export default webhookHandler;
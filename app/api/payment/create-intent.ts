import Stripe from 'stripe';

const stripe = new Stripe('your_stripe_secret_key', {
  apiVersion: '2020-08-27',
});

export default async function createPaymentIntent(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, currency } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
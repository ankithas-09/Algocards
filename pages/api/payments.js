import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { plan } = req.body;

    let priceId;
    switch (plan) {
      case 'basic':
        priceId = 'price_1PpRLBLoDLI6UNkEuY7DqJ7C'; 
        break;
      case 'basic_algorithms':
        priceId = 'price_1PpRLcLoDLI6UNkEOKaWLQck'; 
        break;
      case 'pro':
        priceId = 'price_1PpRLrLoDLI6UNkE4j36PtMK'; 
        break;
      default:
        return res.status(400).json({ error: 'Invalid plan selected' });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/`, // Redirect to home page on success
        cancel_url: `${req.headers.origin}/`, // Redirect to home page on cancel
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.error('Error creating checkout session:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

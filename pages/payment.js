import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../styles/Home.module.css'; // Ensure the correct path to your CSS module

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleSubscribe = async (plan) => {
    if (plan === 'free') {
      router.push('/'); 
      return;
    }

    setLoading(true);
    const stripe = await stripePromise;

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        throw new Error('Failed to create a checkout session');
      }

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Error redirecting to Stripe:', error.message);
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradientOverlay}></div>

      <header className={styles.header}>
        <div className={styles.logo}>Algocards</div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.subscriptionSection}>
          <div className={styles.subscriptionBox}>
            <h2>Free</h2>
            <ul className={styles.featureList}>
              <li>Basic - 3 flashcards</li>
              <li>Algorithms - 2 flashcards</li>
              <li>5 times access</li>
            </ul>
            <button
              className={styles.buyButton}
              onClick={() => handleSubscribe('free')}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Free'}
            </button>
          </div>
          <div className={styles.subscriptionBox}>
            <h2>Basic</h2>
            <ul className={styles.featureList}>
              <li>All basic Flashcards</li>
              <li>Algorithms - 2 flashcards</li>
              <li>8 times access</li>
            </ul>
            <button
              className={styles.buyButton}
              onClick={() => handleSubscribe('basic')}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Buy Basic'}
            </button>
          </div>
          <div className={styles.subscriptionBox}>
            <h2>Basic + Algorithms</h2>
            <ul className={styles.featureList}>
              <li>All basic Flashcards</li>
              <li>All Algorithms flashcards</li>
              <li>12 times access</li>
            </ul>
            <button
              className={styles.buyButton}
              onClick={() => handleSubscribe('basic_algorithms')}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Buy Basic + Algorithms'}
            </button>
          </div>
          <div className={styles.subscriptionBox}>
            <h2>Pro</h2>
            <ul className={styles.featureList}>
              <li>All basic Flashcards</li>
              <li>All Algorithms and Advanced flashcards</li>
              <li>Unlimited access</li>
            </ul>
            <button
              className={styles.buyButton}
              onClick={() => handleSubscribe('pro')}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Buy Pro'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

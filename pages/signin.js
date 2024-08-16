// pages/signin.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styles from '../styles/Home.module.css';
import { firebaseApp } from '../firebase'; // Import your firebaseApp configuration

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const auth = getAuth(firebaseApp); // Initialize Firebase Auth
  const provider = new GoogleAuthProvider();

  const handleSignin = async () => {
    setError(''); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to the home page
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('Account does not exist. Signup first.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format. Please check your email address.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleSignin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, provider);
      router.push('/'); // Redirect to the home page
    } catch (err) {
      setError('An error occurred with Google sign-in. Please try again.');
    }
  };

  return (
    <div>
      <Head>
        <title>Algocards | Sign In</title>
        <meta name="description" content="Login to your Algocards account" />
      </Head>

      <h1 className={styles.welcomeText}>Welcome to Algocards</h1>

      <div className={styles.signinContainer}>
        <div className={styles.signinForm}>
          <h2>Sign In</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button className={styles.submitButton} onClick={handleSignin}>Sign In</button>
          <button className={styles.googleButton} onClick={handleGoogleSignin}>Sign In with Google</button>
          <div className={styles.switchLink}>
            <p>First time user? <a href="/signup">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

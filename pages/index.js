import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase'; // Import your firebaseApp configuration
import styles from '../styles/Home.module.css';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth(firebaseApp); // Initialize Firebase Auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [auth]);

  const handleSignup = (path) => {
    if (user || path === '/') {
      router.push(path);
    } else {
      router.push('/signup');
    }
  }

  const handleNavigation = (path) => {
    if (user || path === '/') {
      router.push(path);
    } else {
      router.push('/signin');
    }
  };

  const handleExplore = (type) => {
    if (user) {
      switch (type) {
        case 'basic':
          router.push('/basic');
          break;
        case 'algorithms':
          router.push('/algorithms');
          break;
        case 'additional':
          router.push('/additional');
          break;
        default:
          router.push('/signin');
      }
    } else {
      router.push('/signin');
    }
  };

  const handleSubscription = async () => {
    try {
      router.push('/payment');
    } catch (error) {
      console.error('Error opening payments page:', error);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally, show an error message
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Algocards | Home</title>
        <meta name="description" content="Welcome to Algocards, your ultimate resource for algorithmic study." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src="/images/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <header className={styles.header}>
        <div className={styles.logo}>Algocards</div>
        <nav className={styles.navbar}>
          <ul className={styles.navLinks}>
            <li><button className={styles.navLink} onClick={() => handleNavigation('/')}>Home</button></li>
            <li><button className={styles.navLink} onClick={() => handleNavigation('/assessment')}>Take Assessment</button></li>
            <li><button className={styles.navLink} onClick={() => handleNavigation('/contact')}>Contact Us</button></li>
          </ul>
        </nav>
        <div className={styles.authButtons}>
          {user ? (
            <>
              <span className={styles.userName}>{user.displayName || user.email}</span>
              <button className={styles.authButton} onClick={handleSubscription}>Subscribe</button>
              <button className={styles.authButton} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className={styles.authButton} onClick={() => handleNavigation('/signin')}>Login</button>
              <button className={styles.authButton} onClick={() => handleSignup('/signup')}>Signup</button>
            </>
          )}
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.aboutSection}>
          <p>
            Welcome to Algocards! We’ve made mastering Data Structures and Algorithms (DSA) effortless with flashcards that break down even the toughest concepts. Whether you’re prepping for interviews or just leveling up your skills, Algocards is your personal study buddy, ready to deliver tailored flashcards to help you achieve your DSA goals with ease.
          </p>
        </section>

        <section className={styles.sampleFlashcards}>
          <div className={styles.flashcard}>
            <img src="/images/dsa1.jpg" alt="Basic Concepts" className={styles.flashcardImage} />
            <h3>Basic Concepts</h3>
            <p>Learn the fundamental concepts that form the basis of algorithms and data structures.</p>
            <button className={styles.readMoreButton} onClick={() => handleExplore('basic')}>Explore</button>
          </div>
          <div className={styles.flashcard}>
            <img src="/images/dsa2.jpg" alt="Algorithms" className={styles.flashcardImage} />
            <h3>Algorithms</h3>
            <p>Dive into various algorithmic strategies and techniques essential for problem-solving.</p>
            <button className={styles.readMoreButton} onClick={() => handleExplore('algorithms')}>Explore</button>
          </div>
          <div className={styles.flashcard}>
            <img src="/images/dsa3.jpg" alt="Additional Concepts" className={styles.flashcardImage} />
            <h3>Additional Concepts</h3>
            <p>Expand your knowledge with advanced topics and cutting-edge concepts.</p>
            <button className={styles.readMoreButton} onClick={() => handleExplore('additional')}>Explore</button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Algocards. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

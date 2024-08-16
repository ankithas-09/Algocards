import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase'; // Import your firebaseApp configuration
import styles from '../styles/Home.module.css'; // Import your styles

export default function Basic() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth(firebaseApp); // Initialize Firebase Auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally, show an error message
    }
  };

  const topics = [
    { name: 'Advanced Topics', description: 'Dive into advanced concepts and techniques in data structures and algorithms.' },
    { name: 'Complexity Analysis', description: 'Understand how to analyze the time and space complexity of algorithms.' },
    { name: 'Advanced Data Structures', description: 'Explore sophisticated data structures such as Trie, Segment Tree, and Fenwick Tree.' },
  ];

  const handleStartLearning = (topicName) => {
    const topicRoutes = {
      'Advanced Topics': '/topics/advanced',
      'Complexity Analysis': '/topics/complexity',
      'Advanced Data Structures': '/topics/ads'
    };

    const route = topicRoutes[topicName];
    if (route) {
      router.push(route);
    } else {
      console.log(`No route found for topic: ${topicName}`);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Algocards | Additional Concepts</title>
        <meta name="description" content="Explore Algorithms in data structures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.gradientOverlay}></div> {/* Apply gradient overlay */}

      <header className={styles.header}>
        <div className={styles.logo}>Algocards</div>
        <nav className={styles.navbar}>
          <ul className={styles.navLinks}>
            <li><button className={styles.navLink} onClick={() => router.push('/')}>Home</button></li>
            <li><button className={styles.navLink} onClick={() => router.push('/assessment')}>Take Assessment</button></li>
            <li><button className={styles.navLink} onClick={() => router.push('/contact')}>Contact Us</button></li>
          </ul>
        </nav>
        <div className={styles.authButtons}>
          {user ? (
            <>
              <span className={styles.userName}>{user.displayName || user.email}</span>
              <button className={styles.authButton} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className={styles.authButton} onClick={() => router.push('/signin')}>Login</button>
              <button className={styles.authButton} onClick={() => router.push('/signup')}>Signup</button>
            </>
          )}
        </div>
      </header>

      <main className={styles.basicContent}>
        <section className={styles.aboutSection}>
          <h1>Additional Concepts</h1>
          <p>Explore advanced concepts, analyze algorithm efficiency, and master sophisticated data structures for optimized problem-solving.</p>
        </section>

        <section className={styles.basicFlashcards}>
          {topics.map((topic) => (
            <div key={topic.name} className={styles.basicFlashcard}>
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              <button className={styles.exploreButton} onClick={() => handleStartLearning(topic.name)}>Start Learning</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

import Head from 'next/head';
// import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { firebaseApp } from '../firebase'; // Import your firebaseApp configuration
import styles from '../styles/Home.module.css'; // Import your styles
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Basic() {
  const { userId } = useAuth();
  // const [user, setUser] = useState(null);
  const router = useRouter();
  // const auth = getAuth(firebaseApp); // Initialize Firebase Auth

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   return () => unsubscribe(); // Clean up subscription on unmount
  // }, [auth]);

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     router.push('/signin'); // Redirect to sign-in page after logout
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //     // Optionally, show an error message
  //   }
  // };

  const topics = [
    { name: 'Arrays', description: 'Learn about arrays, their properties, and operations.' },
    { name: 'Linked Lists', description: 'Understand linked lists and their implementations.' },
    { name: 'Stacks', description: 'Explore stack data structure and its applications.' },
    { name: 'Queues', description: 'Study queues and their use cases.' },
    { name: 'Hashing', description: 'Learn about hashing techniques and hash tables.' },
    { name: 'Trees', description: 'Explore different types of trees and their uses.' },
    { name: 'Heaps', description: 'Understand heap structures and operations.' },
    { name: 'Graphs', description: 'Learn about graphs and various traversal techniques.' },
    { name: 'Strings', description: 'Explore string operations and manipulations.' },
    { name: 'Sets', description: 'Understand the set data structure and its operations.' },
  ];

  const handleStartLearning = (topicName) => {
    const topicRoutes = {
      'Arrays': '/topics/arrays',
      'Linked Lists': '/topics/linkedlists',
      'Stacks': '/topics/stacks',
      'Queues': '/topics/queues',
      'Hashing': '/topics/hashing',
      'Trees': '/topics/trees',
      'Heaps': '/topics/heaps',
      'Graphs': '/topics/graphs',
      'Strings': '/topics/strings',
      'Sets': '/topics/sets',
    };

    const route = topicRoutes[topicName];
    if (route) {
      router.push(route); // Navigate to the corresponding topic page
    } else {
      console.log(`No route found for topic: ${topicName}`);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Algocards | Basic Concepts</title>
        <meta name="description" content="Explore basic concepts in data structures and algorithms." />
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
        {/* <div className={styles.authButtons}>
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
        </div> */}
        <div className={styles.authButtons}>
          {userId ? (
            <>
              
              
              
              <UserButton />
            </>
          ) : (
            <>
              <button className={styles.authButton} onClick={() => handleNavigation('/signin')}>Login</button>
              <button className={styles.authButton} onClick={() => handleSignup('/signup')}>Signup</button>
            </>
          )}
        </div>
      </header>

      <main className={styles.basicContent}>
        <section className={styles.aboutSection}>
          <h1>Basic Concepts</h1>
          <p>Explore the fundamental data structures to enhance your algorithmic skills.</p>
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

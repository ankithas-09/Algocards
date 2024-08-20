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
    { name: 'Sorting Algorithms', description: 'Learn about various sorting algorithms and their complexities.' },
    { name: 'Searching Algorithms', description: 'Explore searching techniques and their applications.' },
    { name: 'Dynamic Programming', description: 'Understand dynamic programming concepts and problem-solving techniques.' },
    { name: 'Greedy Algorithms', description: 'Learn about greedy algorithms and their use cases.' },
    { name: 'Backtracking', description: 'Explore backtracking algorithms and their applications in problem-solving.' },
    { name: 'Divide and Conquer', description: 'Understand divide and conquer strategies for algorithm design.' },
    { name: 'Graph Algorithms', description: 'Learn about various algorithms for graph problems, including traversal and shortest path.' },
  ];

  const handleStartLearning = (topicName) => {
    const topicRoutes = {
      'Sorting Algorithms': '/topics/sorting',
      'Searching Algorithms': '/topics/searching',
      'Dynamic Programming': '/topics/dp',
      'Greedy Algorithms': '/topics/greedy',
      'Backtracking': '/topics/backtracking',
      'Divide and Conquer': '/topics/dc',
      'Graph Algorithms': '/topics/graphalgo'
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
        <title>Algocards | Algorithms</title>
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
          <h1>Algorithms</h1>
          <p>Discover and master a variety of algorithms to solve complex problems efficiently and effectively.</p>
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

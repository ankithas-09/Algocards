// import Head from 'next/head';
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
// import { firebaseApp } from '../firebase'; // Import your firebaseApp configuration
// import styles from '../styles/Home.module.css';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const auth = getAuth(firebaseApp); // Initialize Firebase Auth
//   const firestore = getFirestore(firebaseApp); // Initialize Firestore
//   const provider = new GoogleAuthProvider();

//   const handleSignup = async () => {
//     setError(''); // Clear previous errors
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await updateProfile(user, { displayName: name }); // Update user profile with display name

//       // Add user document to Firestore
//       const userDoc = doc(firestore, 'users', user.uid);
//       await setDoc(userDoc, {
//         name: name,
//         email: email,
//         flashcards: [], // Initialize with empty flashcards
//       });

//       router.push('/signin'); // Redirect to the sign-in page
//     } catch (err) {
//       if (err.code === 'auth/invalid-email') {
//         setError('Invalid email format. Please check your email address.');
//       } else if (err.code === 'auth/weak-password') {
//         setError('Password should be at least 6 characters.');
//       } else {
//         setError('An error occurred. Please try again.');
//       }
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setError('');
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Add user document to Firestore
//       const userDoc = doc(firestore, 'users', user.uid);
//       await setDoc(userDoc, {
//         name: user.displayName || '',
//         email: user.email || '',
//         flashcards: [], // Initialize with empty flashcards
//       });

//       router.push('/'); // Redirect to the home page
//     } catch (err) {
//       setError('An error occurred with Google sign-in. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <Head>
//         <title>Algocards | Sign Up</title>
//         <meta name="description" content="Create a new Algocards account" />
//       </Head>

//       <h1 className={styles.welcomeText}>Welcome to Algocards</h1>

//       <div className={styles.signupContainer}>
//         <div className={styles.signupForm}>
//           <h2>Sign Up</h2>
//           {error && <p className={styles.error}>{error}</p>}
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={styles.input}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={styles.input}
//           />
//           <button className={styles.submitButton} onClick={handleSignup}>Sign Up</button>
//           <button className={styles.googleButton} onClick={handleGoogleSignup}>Sign Up with Google</button>
//           <div className={styles.switchLink}>
//             <p>Already have an account? <a href="/signin">Sign In</a></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignUp routing="hash" />
    </div>
  );
}

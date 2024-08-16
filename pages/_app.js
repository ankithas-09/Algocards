// pages/_app.js
import '../styles/globals.css'; // Import global CSS here
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div className={isHomePage ? 'noBackground' : 'background'}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

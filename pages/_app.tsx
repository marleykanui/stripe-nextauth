// Next Types
import type { AppProps } from 'next/app';

// Global Styles
import '../styles/globals.css';

// Third Party Styles
import '../styles/tailwind.css';

const StripeNextAuth = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default StripeNextAuth;

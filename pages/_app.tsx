// Next Types
import type { AppProps } from 'next/app';

// Global Styles
import '../styles/globals.scss';

// Third Party Styles
import '../styles/tailwind.css';

const StripeNextAuth = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default StripeNextAuth;

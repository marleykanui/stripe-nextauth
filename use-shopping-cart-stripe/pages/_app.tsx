// Next-Auth
import { Provider } from 'next-auth/client';

// Styles
import '@/styles/styles.css';

// Component Level Types
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

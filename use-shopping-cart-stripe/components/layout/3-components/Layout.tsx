// Next
import Head from 'next/head';

// Styles
import styles from '@/styles/Home.module.css';

// React Types
import { FC } from 'react';

// Component Level Types
import { LayoutProps } from '../0-types/LayoutProps';

const Layout: FC<LayoutProps> = ({
  children,
  title = 'TypeScript Next.js Stripe Example',
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thorwebdev" />
      <meta name="twitter:title" content="TypeScript Next.js Stripe Example" />
      <meta
        name="twitter:description"
        content="Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node."
      />
      <meta
        name="twitter:image"
        content="https://nextjs-typescript-react-stripe-js.vercel.app/social_card.png"
      />
    </Head>
    <div className={styles.container}>{children}</div>
  </>
);

export default Layout;

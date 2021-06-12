// Next
import Link from 'next/link';

// Components
import Layout from '@/components/layout/3-components/Layout';

// Next Types
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Link href="/shoppingcart">
        <a className="card cart-style-background">
          <h2 className="bottom">Use Shopping Cart</h2>
        </a>
      </Link>
    </Layout>
  );
};

export default IndexPage;

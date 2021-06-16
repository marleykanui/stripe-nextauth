// React
import { useEffect } from 'react';

// Next
import Link from 'next/link';

// Next-Auth
import { signIn, signOut, useSession } from 'next-auth/client';

// Components
import Layout from '@/components/layout/3-components/Layout';

// Util
import { connectToDatabase } from '@/utils/1-db/mongodb';

// Next Types
import { NextPage, GetServerSideProps } from 'next';

// Component Level Props
interface ServerConnectionProps {
  properties: object;
}

const IndexPage: NextPage<ServerConnectionProps> = ({ properties }) => {
  const [session, loading] = useSession();
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {!session ? (
        <>
          <h1>Not Signed In</h1>
          <br />
          {/* @ts-ignore */}
          <button onClick={signIn}>Sign In</button>
        </>
      ) : (
        <>
          <h1>Signed as {session.user.email}</h1>
          <br />
          {/* @ts-ignore */}
          <button onClick={signOut}>Sign Out</button>
          <pre style={{ height: '20rem', width: '20rem' }}>
            {JSON.stringify(properties, null, 2)}
          </pre>
          <Link href="/shoppingcart">
            <a>
              <h2>Use Shopping Cart</h2>
            </a>
          </Link>
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectToDatabase();

  const data = await db.collection('shipwrecks').find({}).limit(1).toArray();

  const properties = JSON.parse(JSON.stringify(data));

  return {
    props: {
      properties,
    },
  };
};

export default IndexPage;

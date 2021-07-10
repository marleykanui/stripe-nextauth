// Next
import Link from 'next/link';

// Next-Auth
import { signIn, signOut, useSession } from 'next-auth/client';

// Components
import Layout from '@/components/layout/3-components/Layout';

// Next Types
import { NextPage } from 'next';

// Component Level Props
interface ServerConnectionProps {
  properties: object;
}

const IndexPage: NextPage<ServerConnectionProps> = ({ properties }) => {
  const [session, loading] = useSession();
  return (
    <Layout title="stripe-nextauth-test">
      {!session ? (
        <>
          <h1>Not Signed In</h1>
          <br />
          {/* @ts-ignore */}
          <button onClick={signIn}>Sign In</button>
        </>
      ) : (
        <>
          <h1>Signed in as {session.user.email}</h1>
          <br />
          {/* @ts-ignore */}
          <button onClick={signOut}>Sign Out</button>
          <Link href="/shoppingcart">
            <a>
              <h2>Go to Product List</h2>
            </a>
          </Link>
        </>
      )}
    </Layout>
  );
};

export default IndexPage;

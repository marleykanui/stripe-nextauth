// React
import { useEffect } from 'react';
// Next
import Link from 'next/link';

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
  // useEffect(() => {
  //   create({
  //     recrd: '',
  //     vesslterms: '',
  //     feature_type: 'Marley Kanui',
  //     chart: 'US,U1,graph,DNC H1409860',
  //     latdec: 9.3547792,
  //     londec: -79.9081268,
  //     gp_quality: '',
  //     depth: '',
  //     sounding_type: '',
  //     history: '',
  //     quasou: '',
  //     watlev: 'always dry',
  //     coordinates: [-79.9081268, 9.3547792],
  //   });
  // }, []);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <pre style={{ height: '20rem', width: '20rem' }}>
        {JSON.stringify(properties, null, 2)}
      </pre>
      <Link href="/shoppingcart">
        <a>
          <h2>Use Shopping Cart</h2>
        </a>
      </Link>
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

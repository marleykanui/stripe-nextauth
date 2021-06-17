// React
import { useState, useEffect } from 'react';

// Next-Auth
import { useSession, signIn } from 'next-auth/client';

// Axios
import axios from 'axios';

// Components
import Layout from '@/components/layout/3-components/Layout';

// Next Types
import { NextPage } from 'next';

const protectedroute: NextPage = () => {
  const [session, loading] = useSession();
  const [content, setContent] = useState('');

  const getProtectedData = async () => {
    const response = await axios.get('/api/protected/protected');
    const json = await response.data;
    if (json.content) {
      setContent(json.content);
    } else {
      setContent(json.error);
    }
  };

  useEffect(() => {
    getProtectedData();
  }, []);

  return (
    <Layout>
      {!session ? (
        <>
          <h1>Not Signed In</h1>
          <br />
          {/* @ts-ignore */}
          <button onClick={signIn}>Sign In</button> <div>{content}</div>
        </>
      ) : (
        <div>{content}</div>
      )}
    </Layout>
  );
};

export default protectedroute;

// React
import { useEffect, useState } from 'react';

// Components
import Layout from '@/components/layout/3-components/Layout';

// Axios
import axios from 'axios';

// React Types
import { FC, FormEventHandler } from 'react';

const listdb: FC = () => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState('');
  const [featureType, setFeatureType] = useState('');
  const [res, setRes] = useState('');

  const handleGetList: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await axios.get('/api/db/createCustomer', {
      params: {
        collection,
        feature_type: featureType,
      },
    });

    if (!response.data) {
      setRes('No Entries Found');
    } else {
      setRes(response.data.feature_type);
    }
    setLoading(false);
  };

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {!res ? (
            <h1>Query DB</h1>
          ) : res === 'No Entries Found' ? (
            <h1>No Entries Found</h1>
          ) : (
            <h1>{`Found Entry: ${res}`}</h1>
          )}
        </div>
      )}
      <form onSubmit={handleGetList}>
        <label>
          Collection to Access:
          <input
            type="text"
            name="db"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />
        </label>
        <label>
          featureType:
          <input
            type="text"
            value={featureType}
            onChange={(e) => setFeatureType(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  );
};

export default listdb;

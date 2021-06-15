// Utils
import { connectToDatabase } from '@/utils/1-db/mongodb';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const handleDBConnection = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { db } = await connectToDatabase();

  const data = await db
    .collection('listingsAndReviews')
    .find({})
    .limit(1)
    .toArray();

  res.json(data);
};

export default handleDBConnection;

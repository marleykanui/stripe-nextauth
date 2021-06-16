// Utils
import { connectToDatabase } from '@/utils/1-db/mongodb';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const listDBContents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const {
      query: { collection, feature_type },
    } = req;
    const partialDatabaseList = await db
      .collection(collection)
      .findOne({ feature_type });

    res.status(200).json(partialDatabaseList);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default listDBContents;

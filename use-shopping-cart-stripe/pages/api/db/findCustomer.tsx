// Utils
import { connectToDatabase } from '@/utils/1-db/mongodb';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const findCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const {
      body: {
        params: { customer_email },
      },
    } = req;

    const options = {
      projection: { customerEmail: 1, customerTransactions: 1 },
    };

    const foundCustomer = await db
      .collection('customerCheckoutSessions')
      .findOne({ customerEmail: customer_email }, options);

    res.status(200).json(foundCustomer);
  } catch (error) {
    res.status(404).json({ statusCode: 404, message: error.message });
  }
};

export default findCustomer;

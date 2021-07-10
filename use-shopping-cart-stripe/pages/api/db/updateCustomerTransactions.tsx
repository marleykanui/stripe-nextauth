// Utils
import { connectToDatabase } from '@/utils/1-db/mongodb';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const updateCustomerTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Destructure db from connection object
    const { db } = await connectToDatabase();

    // Destructure Data from Request Object
    const {
      body: { customerEmail, currentTransactionId, currentTransactionData },
    } = req;

    // Define updateFilter
    const updateFilter = { customerEmail };

    // Define $set formula to add new data with
    // currentTransactionId as the key
    const updateDocument = {
      $set: {
        ['customerTransactions.' + currentTransactionId]:
          currentTransactionData,
      },
    };

    const updatedCustomerTransactionHistory = await db
      .collection('customerCheckoutSessions')
      .updateOne(updateFilter, updateDocument);

    res.status(200).json(updatedCustomerTransactionHistory);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default updateCustomerTransactions;

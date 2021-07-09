// Utils
import { connectToDatabase } from '@/utils/1-db/mongodb';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const updateCustomerTransactionHistory = async (
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

    // Define updateDocument
    const updateDocument = {
      $set: {
        ['customerTransactions.' + currentTransactionId]:
          currentTransactionData,
      },
    };

    // Define updateOptions
    const updateOptions = { upsert: true };

    // Make update call to specified collection in db
    const updatedCustomerTransactionHistory = await db
      .collection('customerCheckoutSessions')
      .updateOne(updateFilter, updateDocument, updateOptions);

    console.log(updatedCustomerTransactionHistory.matchedCount);

    res.status(200).json(updatedCustomerTransactionHistory);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default updateCustomerTransactionHistory;

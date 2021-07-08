// Utils
import { connectToDatabase } from "@/utils/1-db/mongodb";

// Next Types
import { NextApiRequest, NextApiResponse } from "next";

const createCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const { body } = req;

    const addedCustomerId = await db.collection("collection").insertOne(body);

    res.status(200).json(addedCustomerId);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default createCustomer;

// Next-Auth
import { getSession } from 'next-auth/client';

// Next Types
import { NextApiRequest, NextApiResponse } from 'next';

const protectedData = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  const session = await getSession({ req });
  if (session) {
    res.send({
      content: 'welcome to the protected route',
    });
  } else {
    res.send({
      error: 'You need to be signed in first',
    });
  }
};

export default protectedData;

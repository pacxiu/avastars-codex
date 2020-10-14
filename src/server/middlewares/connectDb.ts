import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { WithDb } from 'types';

const client = new MongoClient(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connectDb = (
  handler: (req: NextApiRequest & WithDb, res: NextApiResponse) => void
) => async (req: NextApiRequest & WithDb, res: NextApiResponse) => {
  if (!client.isConnected()) {
    console.info('Connect to DB');
    await client.connect();
  } else {
    console.info('Already connected');
  }

  req.db = client.db('AvastarDatabase');

  return handler(req, res);
};

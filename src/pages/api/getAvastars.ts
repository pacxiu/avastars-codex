import { Collection } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from 'server/middlewares/connectDb';
import { WithDb } from 'types';

interface AvastarType {
  Score: number;
}

const handler = async (req: NextApiRequest & WithDb, res: NextApiResponse) => {
  const avastars: Collection<AvastarType> = req.db.collection('AvastarCollection');
  const data = await avastars.find({ Score: 45 }).limit(10).toArray();

  res.status(200).json({ data });
};

export default connectDb(handler);

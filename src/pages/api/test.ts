import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from 'server/middlewares/db';
import { AvastarCollectionModel } from 'server/models/AvastarCollection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const test = await AvastarCollectionModel.find({}).count();
  console.log(test);

  res.status(200).json({ name: 'John Doe' });
};

export default connectDb(handler);

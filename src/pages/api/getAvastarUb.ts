import { Collection } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from 'server/middlewares/connectDb';
import { AvastarUbType } from 'server/models/AvastarUbCollection';
import { GetAvastarQueryParams, GetAvastarResponse } from 'services/api';
import { WithDb } from 'types';

const handler = async (req: NextApiRequest & WithDb, res: NextApiResponse) => {
  const { id } = (req.query as unknown) as GetAvastarQueryParams;
  const avastars: Collection<AvastarUbType> = req.db.collection('AvaUbCollection');
  const data = await avastars.findOne({ _id: parseInt(id, 10) });

  res.status(200).json({ data } as GetAvastarResponse);
};

export default connectDb(handler);

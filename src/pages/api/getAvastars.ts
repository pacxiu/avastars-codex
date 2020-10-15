import { Collection, FilterQuery } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from 'server/middlewares/connectDb';
import {
  AvastarType,
  getIdRangeFromSeries,
  getScoreRangeFromRarity,
} from 'server/models/AvastarCollection';
import { GetAvastarsQueryParams, GetAvastarsResponse } from 'services/api';
import { WithDb } from 'types';

const getMatchQuery = (query: GetAvastarsQueryParams): FilterQuery<AvastarType> => {
  const { gender, rarity, series } = query;
  const scoreRange = getScoreRangeFromRarity(rarity);
  const idRange = getIdRangeFromSeries(series);

  return {
    ...(gender && { Gender: gender }),
    ...(scoreRange && {
      Score: {
        ...(scoreRange[0] && { $gte: scoreRange[0] }),
        ...(scoreRange[1] && { $lte: scoreRange[1] }),
      },
    }),
    ...(idRange && {
      _id: {
        ...(idRange[0] && { $gte: idRange[0] }),
        ...(idRange[1] && { $lte: idRange[1] }),
      },
    }),
  };
};

const handler = async (req: NextApiRequest & WithDb, res: NextApiResponse) => {
  const avastars: Collection<AvastarType> = req.db.collection('AvastarCollection');
  const matchQuery = getMatchQuery(req.query);
  console.log(matchQuery);
  const query = await avastars.find(matchQuery).limit(10);
  const data = await query.toArray();
  const total = await query.count();

  res.status(200).json({ data, total } as GetAvastarsResponse);
};

export default connectDb(handler);

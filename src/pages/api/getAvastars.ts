import { capitalizeString } from 'helpers';
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

const getTraitRarityCount = (range: string[]) => {
  const min = parseInt(range[0], 10);
  const max = parseInt(range[1], 10);

  return min !== 0 || max !== 12
    ? {
        min,
        max,
      }
    : undefined;
};

const getMatchQuery = (query: GetAvastarsQueryParams): FilterQuery<AvastarType> => {
  const {
    gender,
    rarity,
    series,
    owner,
    traitName,
    traitRarityCountRarity,
    traitRarityCountRange,
  } = query;
  const traitQuery = traitName ? traitName.split('-') : undefined;
  const scoreRange = getScoreRangeFromRarity(rarity);
  const idRange = getIdRangeFromSeries(series);
  const traitRarityCount = traitRarityCountRarity
    ? getTraitRarityCount(traitRarityCountRange)
    : undefined;

  return {
    ...(gender && { Gender: gender }),
    ...(owner && { Owner: owner }),
    ...(traitQuery && { [`traits.${traitQuery[0]}`]: traitQuery[1] }),
    ...(traitRarityCount && {
      [`RarityDistribution.${capitalizeString(traitRarityCountRarity as string)}`]: {
        $gte: traitRarityCount.min,
        $lte: traitRarityCount.max,
      },
    }),
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
  const query = (req.query as unknown) as GetAvastarsQueryParams;
  const matchQuery = getMatchQuery(query);
  console.info('query', matchQuery, query.size, query.from);
  const cursor = await avastars
    .find(matchQuery)
    .skip(+query.from || 0)
    .limit(Math.min(+query.size || 10, 30));
  const data = await cursor.toArray();
  const total = await cursor.count();

  res.status(200).json({ data, total } as GetAvastarsResponse);
};

export default connectDb(handler);

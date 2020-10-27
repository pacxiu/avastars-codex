import { capitalizeString } from 'helpers';
import { Collection, FilterQuery } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from 'server/middlewares/connectDb';
import {
  AvastarType,
  getIdRangeFromSeries,
  getScoreRangeFromRarity,
  TraitKey,
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

const getTraitsQuery = (traits: string[]) => {
  const traitsObject = {} as { [key in TraitKey]: string[] };

  traits.forEach((trait) => {
    const traitQuery = trait.split('-');
    const key = traitQuery[0] as TraitKey;

    // can have multiple parts for same key
    if (traitsObject[key]) {
      traitsObject[key].push(traitQuery[1]);
    } else {
      traitsObject[key] = [traitQuery[1]];
    }
  });

  const traitsQuery = {};

  Object.entries(traitsObject).forEach(([key, value]) => {
    // convert to mongodb query
    // @ts-ignore
    traitsQuery[`traits.${key}`] = { $in: value };
  });

  return traitsQuery;
};

const getMatchQuery = (query: GetAvastarsQueryParams): FilterQuery<AvastarType> => {
  const {
    gender,
    rarity,
    series,
    owner,
    traits,
    traitRarityCountRarity,
    traitRarityCountRange,
  } = query;
  const traitQuery = traits
    ? getTraitsQuery(typeof traits === 'string' ? [traits] : traits)
    : undefined;
  const scoreRange = getScoreRangeFromRarity(rarity);
  const idRange = getIdRangeFromSeries(series);
  const traitRarityCount = traitRarityCountRarity
    ? getTraitRarityCount(traitRarityCountRange)
    : undefined;

  return {
    ...(gender && { Gender: gender }),
    ...(owner && { Owner: owner.toLowerCase() }),
    ...(traitQuery && traitQuery),
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
  const query = (req.query as unknown) as GetAvastarsQueryParams;
  const matchQuery = getMatchQuery(query);
  console.info('query', matchQuery, query.size, query.from);

  const avastars: Collection<AvastarType> = req.db.collection('AvastarCollection');
  const cursor = await avastars
    .find(matchQuery)
    .skip(+query.from || 0)
    .limit(Math.min(+query.size || 10, 30));
  const data = await cursor.toArray();
  const total = await cursor.count();

  res.status(200).json({ data, total } as GetAvastarsResponse);
};

export default connectDb(handler);

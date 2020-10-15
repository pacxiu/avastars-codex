import { rarityIcons } from 'components/Icons';
import { useState } from 'react';
import { AvastarType, getRarityFromScore, getSeriesFromId } from 'server/models/AvastarCollection';

export const useAvastarMetadata = ({ _id, Score }: AvastarType) => {
  const [rarity] = useState(getRarityFromScore(Score));
  const [series] = useState(getSeriesFromId(_id));
  const Icon = rarityIcons[rarity];

  return {
    rarity,
    series,
    Icon,
  };
};

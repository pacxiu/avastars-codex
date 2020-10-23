type TraitKey =
  | 'skin_tone'
  | 'hair_color'
  | 'eye_color'
  | 'background_color'
  | 'backdrop'
  | 'ears'
  | 'face'
  | 'nose'
  | 'mouth'
  | 'facial_feature'
  | 'eyes'
  | 'hair_style';

export type RarityType = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type GenderType = 'male' | 'female';

export type TraitsType = {
  [key in TraitKey]: string;
};

export interface AvastarType {
  _id: number;
  Gender: GenderType;
  Score: number;
  traits: TraitsType;
  Owner: string;
}

export const getRarityFromScore = (score: number): RarityType => {
  if (score < 33) {
    return 'common';
  }
  if (score < 41) {
    return 'uncommon';
  }
  if (score < 51) {
    return 'rare';
  }
  if (score < 61) {
    return 'epic';
  }

  return 'legendary';
};

export const getScoreRangeFromRarity = (rarity: RarityType | undefined): number[] | undefined => {
  switch (rarity) {
    case 'common':
      return [0, 32];
    case 'uncommon':
      return [33, 40];
    case 'rare':
      return [41, 50];
    case 'epic':
      return [51, 60];
    case 'legendary':
      return [61];
    default:
      return undefined;
  }
};

export const getIdRangeFromSeries = (series: string | undefined): number[] | undefined => {
  switch (series) {
    case '0':
      return [0, 199];
    case '1':
      return [200, 5199];
    case '2':
      return [5200, 10199];
    case '3':
      return [10200, 15199];
    default:
      return undefined;
  }
};

// 0-199 Series 1
// 200-5199 Series 2
// 5200-10199 Series 3
// 10200-15199 Series 4
export const getSeriesFromId = (id: number): number => Math.floor((id - 200) / 5000) + 1;

export const getAvastarImage = (id: number) => `https://avastars.io/media/${id}`;

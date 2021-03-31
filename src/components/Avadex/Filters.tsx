import React, { ReactNode } from 'react';
import { GenderType, RarityType } from 'server/models/AvastarCollection';
import { CUSTOM_SIZES } from 'theme';
import { Box, Checkbox, Flex, Label, Text } from 'theme-ui';
import TraitsRaw from './traits-raw.json';
import RangeSlider from './RangeSlider';
import { GetAvastarsQueryParams } from 'services/api';
import Select from './Select';

type TraitNameOption = { value: string; label: string };

const transformGene = (gene: string) => gene.toLowerCase().split(' ').join('_');

const getTraitNamesFromRaw = () => {
  const traitNames: TraitNameOption[] = [];

  Object.values(TraitsRaw).forEach((value) => {
    value.forEach((trait) => {
      if (trait && trait.name) {
        traitNames.push({
          value: `${transformGene(trait.gene)}-${trait.name}`,
          label: `${trait.name} - ${trait.gene} - ${trait.gender}`,
        });
      }
    });
  });

  return traitNames;
};

export const TRAIT_NAME_OPTIONS = getTraitNamesFromRaw();

const GENDER_OPTIONS: { value: GenderType | undefined; label: string }[] = [
  { value: undefined, label: 'Any' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

type RarityOption = { value: RarityType | undefined; label: string };

export const RARITY_OPTIONS: RarityOption[] = [
  { value: undefined, label: 'Any' },
  { value: 'common', label: 'Common' },
  { value: 'uncommon', label: 'Uncommon' },
  { value: 'rare', label: 'Rare' },
  { value: 'epic', label: 'Epic' },
  { value: 'legendary', label: 'Legendary' },
];

const SERIES_OPTIONS: { value: string | undefined; label: string }[] = [
  { value: undefined, label: 'Any' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

export type FiltersType = Omit<
  GetAvastarsQueryParams,
  'from' | 'size' | 'traitRarityCountRange' | 'traitRarityCountRarity' | 'traits'
> & {
  from: number;
  size: number;
  traitRarityCountRarity: RarityOption;
  traitRarityCountRange: number[];
  traits?: TraitNameOption[];
};

const FilterTitle = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      textTransform: 'uppercase',
      fontSize: 5,
      mb: 1,
      color: 'primary',
      fontWeight: 'semiBold',
    }}
  >
    {children}
  </Box>
);

const FilterContainer = ({ children }: { children: ReactNode }) => (
  <Box sx={{ mb: 4 }}>{children}</Box>
);

const Filters = ({
  filters: { gender, rarity, series, traitRarityCountRarity, traitRarityCountRange, traits },
  updateFilters,
}: {
  filters: FiltersType;
  updateFilters: (filters: Partial<FiltersType>) => void;
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        top: CUSTOM_SIZES.menuHeight,
        bg: 'background',
        width: CUSTOM_SIZES.filtersWidth,
        p: [2, 3],
        borderRight: 'normal',
        borderColor: 'primaryAlt',
      }}
    >
      <FilterContainer>
        <FilterTitle>Gender</FilterTitle>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {GENDER_OPTIONS.map(({ label, value }) => (
            <Box key={label}>
              <Label>
                {label}
                <Checkbox
                  onChange={() => updateFilters({ gender: value })}
                  checked={gender === value}
                />
              </Label>
            </Box>
          ))}
        </Flex>
      </FilterContainer>
      <FilterContainer>
        <FilterTitle>Rarity</FilterTitle>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {RARITY_OPTIONS.map(({ label, value }) => (
            <Box key={label}>
              <Label>
                {label}
                <Checkbox
                  onChange={() => updateFilters({ rarity: value })}
                  checked={rarity === value}
                />
              </Label>
            </Box>
          ))}
        </Flex>
      </FilterContainer>
      <FilterTitle>Series</FilterTitle>
      <FilterContainer>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {SERIES_OPTIONS.map(({ label, value }) => (
            <Box key={label}>
              <Label>
                {label}
                <Checkbox
                  onChange={() => updateFilters({ series: value })}
                  checked={series === value}
                />
              </Label>
            </Box>
          ))}
        </Flex>
      </FilterContainer>
      <FilterContainer>
        <FilterTitle>Traits Rarity Count</FilterTitle>
        <Select
          options={RARITY_OPTIONS}
          value={traitRarityCountRarity}
          onChange={(value) => {
            updateFilters({ traitRarityCountRarity: value as RarityOption });
          }}
        />
        {traitRarityCountRarity.value !== undefined && (
          <Box sx={{ mt: 3 }}>
            <RangeSlider
              min={0}
              max={12}
              allowCross={false}
              value={traitRarityCountRange}
              onChange={(value) => updateFilters({ traitRarityCountRange: value })}
            />
            <Flex sx={{ justifyContent: 'space-between', mt: 1 }}>
              <Text>{traitRarityCountRange[0]}</Text>
              <Text>{traitRarityCountRange[1]}</Text>
            </Flex>
          </Box>
        )}
      </FilterContainer>
      <FilterContainer>
        <FilterTitle>Trait</FilterTitle>
        <Select
          isMulti
          options={TRAIT_NAME_OPTIONS}
          value={traits}
          onChange={(value) => updateFilters({ traits: value as TraitNameOption[] })}
        />
      </FilterContainer>
    </Box>
  );
};

export default Filters;

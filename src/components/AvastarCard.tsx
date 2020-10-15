import React, { useState } from 'react';
import { AvastarType, getRarityFromScore, getSeriesFromId } from 'server/models/AvastarCollection';
import { pxToRem, TRANSITIONS } from 'theme';
import { Box, Flex, Image, Text } from 'theme-ui';
import { rarityIcons } from './Icons';

const getAvastarImage = (id: number) => `https://avastars.io/media/${id}`;

const AvastarCard = ({ _id, Score }: AvastarType) => {
  const [rarity] = useState(getRarityFromScore(Score));
  const [series] = useState(getSeriesFromId(_id));
  const Icon = rarityIcons[rarity];

  return (
    <Box
      onClick={() => window.alert(`modal for ${_id}`)}
      sx={{
        width: pxToRem(250),
        margin: 3,
        border: 'normal',
        borderColor: `rarity.${rarity}`,
        cursor: 'pointer',
        bg: 'background',
        transition: TRANSITIONS.standard,
        '&:hover': {
          boxShadow: (theme) => `0 0 5px 2px ${theme.colors.rarity[rarity]}`,
        },
      }}
    >
      <Box sx={{ p: 1 }}>
        <Image variant="avastarCard" src={getAvastarImage(_id)} />
        <Flex
          sx={{
            bg: 'background',
            mt: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <Text sx={{ fontWeight: 'semiBold', mr: 2 }}>#{_id}</Text>
            <Text sx={{ fontSize: 3 }}>Series {series}</Text>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Box sx={{ width: pxToRem(22), height: pxToRem(22) }}>
              {/* @ts-ignore */}
              <Icon />
            </Box>
            <Text sx={{ color: `rarity.${rarity}`, ml: 2, fontWeight: 'semiBold' }}>{Score}</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default AvastarCard;

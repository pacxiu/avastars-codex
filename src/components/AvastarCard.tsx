import { useAvastarMetadata } from 'hooks/useAvastarMetadata';
import React, { Dispatch, SetStateAction } from 'react';
import { AvastarType, getAvastarImage } from 'server/models/AvastarCollection';
import { pxToRem, TRANSITIONS } from 'theme';
import { Box, Flex, Image, Text } from 'theme-ui';

const AvastarCard = ({
  avastar,
  avastar: { _id, Score },
  setAvastarModal,
}: {
  avastar: AvastarType;
  setAvastarModal: Dispatch<SetStateAction<AvastarType | undefined>>;
}) => {
  const { rarity, series, Icon } = useAvastarMetadata(avastar);

  return (
    <Box
      onClick={() => setAvastarModal(avastar)}
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
        <Image
          variant="avastarCard"
          src={getAvastarImage(_id)}
          sx={{ height: pxToRem(238), bg: 'primaryAlt' }}
        />
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

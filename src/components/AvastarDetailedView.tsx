import { useAvastarMetadata } from 'hooks/useAvastarMetadata';
import { formatAddress } from 'providers/Web3Provider';
import {
  AvastarType,
  getAvastarImage,
  TraitsRarityType,
  TraitsType,
  TraitKey,
} from 'server/models/AvastarCollection';
import { pxToRem } from 'theme';
import { Box, Flex, Image, Text } from 'theme-ui';
import AppLink from './AppLink';
import { rarityIcons } from './Icons';

const Traits = ({
  traits,
  TraitsRarity,
}: {
  traits: TraitsType;
  TraitsRarity: TraitsRarityType;
}) => {
  return (
    <Box sx={{ bg: 'primaryAlt' }}>
      {Object.entries(traits).map(([key, value]) => {
        const traitRarity = TraitsRarity[key as TraitKey];
        // @ts-ignore
        const Icon = rarityIcons[traitRarity.toLowerCase()];

        return (
          <Flex
            key={key}
            sx={{
              justifyContent: 'space-between',
              p: pxToRem(12),
              px: 2,
              borderBottom: 'normal',
              borderColor: 'primaryEmphasis',
              fontWeight: 'semiBold',
              textTransform: 'uppercase',
              fontSize: 3,
            }}
          >
            <Flex>
              <Box sx={{ width: pxToRem(20), mr: 2 }}>
                <Icon />
              </Box>
              <Text sx={{ minWidth: '8em' }}>{key.split('_').join(' ')}</Text>
              <Text mx={2}>|</Text>
              <Text sx={{ color: `rarity.${traitRarity.toLowerCase()}` }}>{value}</Text>
            </Flex>
            <Text
              sx={{
                pl: [2, 3, 5],
                color: `rarity.${traitRarity.toLowerCase()}`,
              }}
            >
              {traitRarity}
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

const AvastarDetailedView = ({
  avastar,
  avastar: { _id, Gender, Score, traits, Owner, TraitsRarity },
}: {
  avastar: AvastarType;
}) => {
  const { rarity, series, Icon } = useAvastarMetadata(avastar);

  return (
    <Box
      sx={{
        p: '2px',
        bg: 'primaryEmphasis',
        clipPath:
          'polygon(100% 0px, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0px 100%, 0px 13px, 13px 0px)',
      }}
    >
      <Flex
        sx={{
          bg: 'surface',
          border: `light`,
          borderColor: 'primaryEmphasis',
          clipPath:
            'polygon(100% 0px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0px 100%, 0px 12px, 12px 0px);',
        }}
      >
        <Box sx={{ p: 4, pr: pxToRem(40), borderRight: 'thick', borderColor: 'primaryEmphasis' }}>
          <Flex
            variant="text.avastarViewLabel"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text>
              {Gender} / Gen 1 / Series {series}
            </Text>
            <Text sx={{ fontSize: 6 }}>#{_id}</Text>
          </Flex>

          <Box sx={{ width: pxToRem(400), mx: 'auto' }}>
            <Image src={getAvastarImage(_id)} sx={{ height: pxToRem(400) }} />
          </Box>
          <Flex sx={{ alignItems: 'center' }}>
            <Box sx={{ width: pxToRem(35) }}>
              {/* @ts-ignore */}
              <Icon />
            </Box>
            <Text
              sx={{
                color: `rarity.${rarity}`,
                fontWeight: 'semiBold',
                textTransform: 'uppercase',
                fontSize: 6,
                ml: 3,
              }}
            >
              {rarity}
            </Text>
          </Flex>
          <Flex
            variant="text.avastarViewLabel"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text>Owner: </Text>
            <AppLink href="/profile/[address]" as={`/profile/${Owner}`}>
              {formatAddress(Owner)}
            </AppLink>
          </Flex>
        </Box>
        <Box sx={{ p: 4, pl: pxToRem(40), flex: 1 }}>
          <Flex
            variant="text.avastarViewLabel"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text>Traits</Text>
            <Text sx={{ fontSize: 6, color: `rarity.${rarity}` }}>Score: {Score}</Text>
          </Flex>
          <Traits {...{ traits, TraitsRarity }} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AvastarDetailedView;

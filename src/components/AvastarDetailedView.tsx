import { useAvastarMetadata } from 'hooks/useAvastarMetadata';
import { formatAddress } from 'providers/Web3Provider';
import { AvastarType, getAvastarImage, TraitsType } from 'server/models/AvastarCollection';
import { pxToRem } from 'theme';
import { Box, Flex, Image, Text } from 'theme-ui';
import AppLink from './AppLink';

const Traits = ({ traits }: { traits: TraitsType }) => {
  return (
    <Box>
      {Object.entries(traits).map(([key, value]) => (
        <Text key={key}>
          {key} - {value}
        </Text>
      ))}
    </Box>
  );
};

const AvastarDetailedView = ({
  avastar,
  avastar: { _id, Gender, Score, traits, Owner },
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
        <Box sx={{ p: 4, pl: pxToRem(40) }}>
          <Flex
            variant="text.avastarViewLabel"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text>Traits</Text>
            <Text sx={{ fontSize: 6, color: `rarity.${rarity}` }}>Score: {Score}</Text>
          </Flex>
          <Traits {...{ traits }} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AvastarDetailedView;
